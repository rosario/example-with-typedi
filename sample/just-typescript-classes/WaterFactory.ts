export class WaterFactory {
    create() {
        console.log("water created");
    }
}

export const waterFactory = new WaterFactory();