"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;
var _merge = require("@graphql-tools/merge");
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Gene = _fs["default"].readFileSync("./src/services/geneService/gene_schema.graphql").toString();
var common = _fs["default"].readFileSync("./src/services/common/common_properties.graphql").toString();
var typeDefs = exports.typeDefs = (0, _merge.mergeTypeDefs)([Gene, common]);