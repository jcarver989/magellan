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
exports.AwsGlueMetastoreProvider = void 0;
const client_glue_1 = require("@aws-sdk/client-glue");
const util_1 = require("util");
class AwsGlueMetastoreProvider {
    constructor(glueClient) {
        this.glueClient = glueClient;
        this.maxResults = 1000;
    }
    searchForTables(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new client_glue_1.SearchTablesCommand({
                MaxResults: this.maxResults,
                SearchText: searchText
            });
            const { TableList = [] } = yield this.glueClient.send(query);
            console.log((0, util_1.inspect)(TableList, { colors: true, depth: null, showHidden: false }));
            return TableList.map((t) => this.toTable(t));
        });
    }
    getTableByName(databaseName, tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new client_glue_1.GetTableCommand({
                DatabaseName: databaseName,
                Name: tableName
            });
            const { Table } = yield this.glueClient.send(query);
            if (Table) {
                return this.toTable(Table);
            }
        });
    }
    toTable(table) {
        var _a;
        const { Columns = [], Location } = (_a = table.StorageDescriptor) !== null && _a !== void 0 ? _a : {};
        return {
            name: table.Name,
            databaseName: table.DatabaseName,
            description: table.Description,
            location: Location,
            columns: Columns.map((c) => {
                return {
                    name: c.Name,
                    type: c.Type,
                    description: c.Comment
                };
            })
        };
    }
}
exports.AwsGlueMetastoreProvider = AwsGlueMetastoreProvider;
