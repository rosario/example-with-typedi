export interface SugarFactory {
    create () : void;
}

const sugarFactory : SugarFactory = {
    create() {
        console.log("sugar created");
    }
}

export default sugarFactory;
