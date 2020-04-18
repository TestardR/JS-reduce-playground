"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var data_1 = __importDefault(require("./data"));
var values = lodash_1.default.flatten(data_1.default);
var folders = values
    // create unique folders from common key path
    .reduce(function (acc, curr) {
    var path = curr['Key'];
    var folder = path.substring(0, path.lastIndexOf('/'));
    if (!acc.includes(folder)) {
        acc.push(folder);
    }
    return acc;
}, [])
    // create object type from folders
    .reduce(function (acc, curr) {
    var _a;
    acc.push((_a = {}, _a[curr] = [], _a));
    return acc;
}, []);
// loop through all the files, add them to their folder
values.forEach(function (data) {
    folders.forEach(function (folder) {
        var key = data.Key.substring(0, data.Key.lastIndexOf('/'));
        var dir = Object.keys(folder)[0];
        if (key === dir) {
            folder[key].push(data);
        }
    });
});
console.log(folders);
