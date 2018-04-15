import {beanFactory}  from "./BeanFactory";
import {sugarFactory} from "./SugarFactory";
import {waterFactory} from "./WaterFactory";

export interface CoffeeMaker {
    make () : void
}

export function createCoffeeMaker(
    createBean:  Function,
    createSugar: Function,
    createWater: Function ): CoffeeMaker {
    return {
        make() {
            createBean();
            createSugar();
            createWater();
            console.log("coffee is made");
        }
    }
}
const coffeeMaker = createCoffeeMaker(beanFactory.create, sugarFactory.create, waterFactory.create)

export default coffeeMaker
