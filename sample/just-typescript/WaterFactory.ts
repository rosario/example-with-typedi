export interface WaterFactory {
    create () : void;
}

export const waterFactory : WaterFactory = {
    create() {
        console.log("water created");
    }
}
