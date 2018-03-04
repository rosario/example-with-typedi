"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typedi_1 = require("typedi");
var CoffeeMaker_1 = require("./CoffeeMaker");
var coffeeMaker = typedi_1.Container.get(CoffeeMaker_1.CoffeeMaker);
coffeeMaker.make();
//# sourceMappingURL=app.js.map