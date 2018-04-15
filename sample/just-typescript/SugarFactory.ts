export interface SugarFactory {
    create () : void;
}

export const sugarFactory : SugarFactory = {
    create() {
        console.log("sugar created");
    }
}

