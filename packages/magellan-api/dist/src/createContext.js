"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const metastore_1 = require("./metastore");
function createContext() {
    return { metastoreClient: (0, metastore_1.getMetastoreClientFromEnv)() };
}
exports.createContext = createContext;
