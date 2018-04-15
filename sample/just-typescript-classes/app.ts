import {beanFactory}  from "./BeanFactory";
import {sugarFactory} from "./SugarFactory";
import {waterFactory} from "./WaterFactory";
import {CoffeeMaker} from "./CoffeeMaker";


export const coffeeMaker = new CoffeeMaker(beanFactory, sugarFactory, waterFactory);
coffeeMaker.make();


