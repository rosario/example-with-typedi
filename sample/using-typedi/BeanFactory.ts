import { Service } from "typedi";

@Service()
export class BeanFactory {

    create() {
        console.log("bean created");
    }

}