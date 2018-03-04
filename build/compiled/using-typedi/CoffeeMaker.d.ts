import { BeanFactory } from "./BeanFactory";
import { SugarFactory } from "./SugarFactory";
import { WaterFactory } from "./WaterFactory";
export declare class CoffeeMaker {
    beanFactory: BeanFactory;
    sugarFactory: SugarFactory;
    waterFactory: WaterFactory;
    make(): void;
}
