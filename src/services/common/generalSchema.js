import { mergeTypeDefs } from "@graphql-tools/merge";

import fs from "fs";

const Gene = fs
  .readFileSync("./src/services/geneService/gene_schema.graphql")
  .toString();

const common = fs
  .readFileSync("./src/services/common/common_properties.graphql")
  .toString();

export const typeDefs = mergeTypeDefs([Gene, common]);
