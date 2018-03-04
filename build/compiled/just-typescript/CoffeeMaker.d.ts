export interface CoffeeMaker {
    make(): void;
}
export declare function CoffeeMaker(createBean: Function, createSugar: Function, createWater: Function): CoffeeMaker;
declare const coffeeMaker: CoffeeMaker;
export default coffeeMaker;
