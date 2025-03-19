import { Gene } from "./Gene_model";
import { geneController } from "./Gene_controller";
import { commonController } from "../common/controller_common_functions";

export const geneResolvers = {
  Query: {
    getAllGenes: (root, { limit, page }) =>
      commonController.getAll(Gene, limit, page, "gene.accessionId"),
    getGeneBy: (
      root,
      { search, advancedSearch, limit, page, properties, fullMatchOnly }
    ) =>
      geneController.getGeneBy(
        search,
        advancedSearch,
        limit,
        page,
        properties,
        fullMatchOnly
      ),
  },
};
