"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
var _merge = require("@graphql-tools/merge");
var _gene_resolver = require("../geneService/gene_resolver");
//Resolvers list

// All services added

var resolvers = exports.resolvers = (0, _merge.mergeResolvers)([_gene_resolver.geneResolvers]);