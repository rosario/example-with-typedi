import {BeanFactory, beanFactory}  from "./BeanFactory";
import {SugarFactory, sugarFactory} from "./SugarFactory";
import {WaterFactory, waterFactory} from "./WaterFactory";

export class CoffeeMaker {
    constructor(
        public beanFactory: BeanFactory,
        public sugarFactory: SugarFactory,
        public waterFactory: WaterFactory) {}

    make() {
        this.beanFactory.create();
        this.sugarFactory.create();
        this.waterFactory.create();
        console.log("coffee is made");
    }
}



