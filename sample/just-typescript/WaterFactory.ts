export interface WaterFactory {
    create () : void;
}

const waterFactory : WaterFactory = {
    create() {
        console.log("water created");
    }
}

export default waterFactory;
