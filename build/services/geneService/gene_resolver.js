"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geneResolvers = void 0;
var _Gene_model = require("./Gene_model");
var _Gene_controller = require("./Gene_controller");
var _controller_common_functions = require("../common/controller_common_functions");
var geneResolvers = exports.geneResolvers = {
  Query: {
    getAllGenes: function getAllGenes(root, _ref) {
      var limit = _ref.limit,
        page = _ref.page;
      return _controller_common_functions.commonController.getAll(_Gene_model.Gene, limit, page, "gene.accessionId");
    },
    getGeneBy: function getGeneBy(root, _ref2) {
      var search = _ref2.search,
        advancedSearch = _ref2.advancedSearch,
        limit = _ref2.limit,
        page = _ref2.page,
        properties = _ref2.properties,
        fullMatchOnly = _ref2.fullMatchOnly;
      return _Gene_controller.geneController.getGeneBy(search, advancedSearch, limit, page, properties, fullMatchOnly);
    }
  }
};