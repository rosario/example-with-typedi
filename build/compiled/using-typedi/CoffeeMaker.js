"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var BeanFactory_1 = require("./BeanFactory");
var SugarFactory_1 = require("./SugarFactory");
var WaterFactory_1 = require("./WaterFactory");
var CoffeeMaker = /** @class */ (function () {
    function CoffeeMaker() {
        this.beanFactory = typedi_1.Container.get(BeanFactory_1.BeanFactory);
        this.sugarFactory = typedi_1.Container.get(SugarFactory_1.SugarFactory);
        this.waterFactory = typedi_1.Container.get(WaterFactory_1.WaterFactory);
    }
    CoffeeMaker.prototype.make = function () {
        this.beanFactory.create();
        this.sugarFactory.create();
        this.waterFactory.create();
        console.log("coffee is made");
    };
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", BeanFactory_1.BeanFactory)
    ], CoffeeMaker.prototype, "beanFactory", void 0);
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", SugarFactory_1.SugarFactory)
    ], CoffeeMaker.prototype, "sugarFactory", void 0);
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", WaterFactory_1.WaterFactory)
    ], CoffeeMaker.prototype, "waterFactory", void 0);
    CoffeeMaker = __decorate([
        typedi_1.Service()
    ], CoffeeMaker);
    return CoffeeMaker;
}());
exports.CoffeeMaker = CoffeeMaker;
//# sourceMappingURL=CoffeeMaker.js.map