"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        getDatabases(_, __, { metastoreClient }) {
            return __awaiter(this, void 0, void 0, function* () {
                const databases = yield metastoreClient.getDatabases();
                return { databases };
            });
        },
        getTablesByDatabaseName(_, { input }, { metastoreClient }) {
            return __awaiter(this, void 0, void 0, function* () {
                const tables = yield metastoreClient.getTablesByDatabaseName(input.databaseName);
                return { tables };
            });
        },
        searchTables(_, { input }, { metastoreClient }) {
            return __awaiter(this, void 0, void 0, function* () {
                const tables = yield metastoreClient.searchTables(input.searchText);
                return {
                    tables
                };
            });
        },
        getTableByName(_, { input }, { metastoreClient }) {
            return __awaiter(this, void 0, void 0, function* () {
                const table = yield metastoreClient.getTableByName(input.databaseName, input.tableName);
                if (table) {
                    return { table };
                }
                else {
                    return {};
                }
            });
        }
    }
};
