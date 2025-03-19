import { GraphQLError } from "graphql";
import { Model } from "mongoose";

export class commonController {
  /** Retrieve a object with all the documents containing in selected collection
   *  @param {Model} collection tells to function the mongoose model to be used
   *  @param {Number} limit defines the page results showed (10 by default)
   *  @param {Number} page select the current result page (0 by default)
   *  @param {String} sortValue tells the function the field by which the results will be sorted
   */
  static async getAll(collection, limit = 0, page = 0, sortValue) {
    // variable definitions
    let hasMore = false;
    let response;

    // get query response from mongodb through mongoose
    const offset = page * limit;

    // if the limit is greater than 100, the data will not be sorted to
    // reduce the response time; if it is less than or equal to 100 the
    // data will be ordered alphabetically by sortValue

    // get another data that be in Pagination Type
    const total = await this.countDocumentsIn(collection);

    if (limit == 0) {
      limit = total;
    }

    if (limit > 100) {
      response = await collection
        .aggregate([
          {
            $limit: limit,
          },
          {
            $skip: offset,
          },
        ])
        .allowDiskUse(true);
    } else
      response = await collection
        .find({})
        .sort(sortValue)
        .limit(limit)
        .skip(offset);

    const showedResult = limit * (page + 1);
    let lastPage = 0;
    if (limit > 0) {
      lastPage = Math.floor(total / limit);
    }
    if (showedResult < total) hasMore = true;
    if (page > lastPage) {
      const err = new GraphQLError("You must select an available page number");
      err.status = "No Content";
      err.statusCode = 204;
      throw err;
    } else {
      return {
        data: response,
        pagination: {
          limit: limit,
          currentPage: page,
          firstPage: 0,
          lastPage: lastPage || 0,
          totalResults: total,
          hasNextPage: hasMore,
        },
      };
    }
  }

  /** Get the count document of the selected collection
   *  @param {Model} collection tells to function the mongoose model to be used
   *  @param {String} filter needs the filter used by the query to get the count (by default is
   *  empty {} por getAll count)
   */
  static async countDocumentsIn(collection, filter = {}) {
    try {
      const numeroDocumentos = await collection.countDocuments(filter);
      return numeroDocumentos;
    } catch (error) {
      console.error("Error al contar documentos:", error);
      throw error;
    }
  }
}
