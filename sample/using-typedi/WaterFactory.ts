import { Service } from "typedi";

@Service()
export class WaterFactory {

    create() {
        console.log("water created");
    }

}