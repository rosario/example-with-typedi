import {Service,Inject, Container} from "typedi";
import {BeanFactory} from "./BeanFactory";
import {SugarFactory} from "./SugarFactory";
import {WaterFactory} from "./WaterFactory";

@Service()
export class CoffeeMaker {

    @Inject()
    beanFactory: BeanFactory = Container.get(BeanFactory);

    @Inject()
    sugarFactory: SugarFactory = Container.get(SugarFactory);

    @Inject()
    waterFactory: WaterFactory = Container.get(WaterFactory);

    make() {
        this.beanFactory.create();
        this.sugarFactory.create();
        this.waterFactory.create();

        console.log("coffee is made");
    }

}