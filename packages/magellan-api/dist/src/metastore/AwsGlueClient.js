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
exports.AwsGlueClient = void 0;
const client_glue_1 = require("@aws-sdk/client-glue");
const util_1 = require("util");
/** A metastore client backed by AWS Glue Data Catalog */
class AwsGlueClient {
    constructor(glueClient = new client_glue_1.GlueClient({})) {
        this.glueClient = glueClient;
    }
    getDatabases() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new client_glue_1.GetDatabasesCommand({
                MaxResults: 100 // max
            });
            const { DatabaseList = [] } = yield this.glueClient.send(query);
            return DatabaseList.map((db) => ({
                name: db.Name,
                description: db.Description,
                tables: []
            }));
        });
    }
    getTablesByDatabaseName(databaseName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new client_glue_1.GetTablesCommand({
                DatabaseName: databaseName,
                MaxResults: 100
            });
            const { TableList = [] } = yield this.glueClient.send(query);
            return TableList.map((t) => this.toTable(t));
        });
    }
    searchTables(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new client_glue_1.SearchTablesCommand({
                MaxResults: 1000,
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
        const { Parameters = {} } = table;
        const { Columns = [], Location } = (_a = table.StorageDescriptor) !== null && _a !== void 0 ? _a : {};
        const properties = Object.entries(Parameters).map(([name, value]) => ({
            name,
            value
        }));
        return {
            name: table.Name,
            databaseName: table.DatabaseName,
            description: table.Description,
            location: Location,
            properties,
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
exports.AwsGlueClient = AwsGlueClient;
