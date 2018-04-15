export class SugarFactory {
    create() {
        console.log("bean created");
    }
}

export const sugarFactory = new SugarFactory();

