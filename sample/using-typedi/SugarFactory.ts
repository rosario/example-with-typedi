import { Service } from "typedi";

@Service()
export class SugarFactory {

    create() {
        console.log("sugar created");
    }

}