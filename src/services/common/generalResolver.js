import { mergeResolvers } from "@graphql-tools/merge";

//Resolvers list
import { geneResolvers } from "../geneService/gene_resolver";

// All services added

export const resolvers = mergeResolvers([geneResolvers]);
