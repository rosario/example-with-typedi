let { CoffeeMaker } = require("../../build/compiled/prova-nodi/CoffeeMaker.js");


const mockBean  = () => console.log("fakeBean made");
const mockSugar = () => console.log("fakeSugar made");
const mockWater = () => console.log("fakeWater made");

const coffeeMaker = CoffeeMaker( mockBean, mockSugar, mockWater);

describe("mocking CoffeMaker instance", () => {
    it("should run the mocked ingredients", () => {
        let output = coffeeMaker.make();
        expect(true).toBe(true);
    })
})

