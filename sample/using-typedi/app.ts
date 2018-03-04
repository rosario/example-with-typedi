import "reflect-metadata";
import {Container} from "typedi";
import {CoffeeMaker} from "./CoffeeMaker";

let coffeeMaker = Container.get(CoffeeMaker);
coffeeMaker.make();