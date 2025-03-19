import { Gene } from "./Gene_model";
import { commonController } from "../common/controller_common_functions";
import {
  advancedSearchFilter,
  textSearchFilter,
} from "mongodb-filter-object-parser";
import { GraphQLError } from "graphql";

class geneController {
  static async getGeneBy(
    search,
    advancedSearch,
    limit = 0,
    page = 0,
    properties = ["_id", "gene.name", "gene.accessionId", "chromosome.name"],
    fullMatchOnly = false
  ) {
    const offset = page * limit;
    let filter;
    let hasMore = false;

    if (advancedSearch !== undefined) {
      filter = advancedSearchFilter(advancedSearch);
    } else if (search !== undefined) {
      filter = textSearchFilter(search, properties, fullMatchOnly);
    }

    const genes = await Gene.find(filter).limit(limit).skip(offset);
    const total = await commonController.countDocumentsIn(Gene, filter);
    let lastPage = Math.floor(total / limit);

    if (limit * (page + 1) < total) hasMore = true;
    if (page > lastPage) {
      throw new GraphQLError("Page number exceeds available results.");
    }

    return {
      data: genes,
      pagination: {
        limit,
        currentPage: page,
        firstPage: 0,
        lastPage: lastPage || 0,
        totalResults: total,
        hasNextPage: hasMore,
      },
    };
  }
}

export { geneController };
