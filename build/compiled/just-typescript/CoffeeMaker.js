"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BeanFactory_1 = require("./BeanFactory");
var SugarFactory_1 = require("./SugarFactory");
var WaterFactory_1 = require("./WaterFactory");
function CoffeeMaker(createBean, createSugar, createWater) {
    return {
        make: function () {
            createBean();
            createSugar();
            createWater();
            console.log("coffee is made");
        }
    };
}
exports.CoffeeMaker = CoffeeMaker;
var coffeeMaker = CoffeeMaker(BeanFactory_1.default.create, SugarFactory_1.default.create, WaterFactory_1.default.create);
exports.default = coffeeMaker;
//# sourceMappingURL=CoffeeMaker.js.map