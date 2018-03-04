Just an example how to use `typedi` for dependecy injectin Typescript, and implementing the same (hopefully) functionality
with plain Typescript. 


## Using TypeDI (example from the docs)
This example is taken directly from the `typedi` documentation. It's quite straightforward, there are three injected dependency
and CoffeeMaker uses all of them to call the `create` method. Note: all of the instances are singletons. 

For example, one of the dependecy is `BeanFactory`

```typescript
  import {Service} from "typedi";
  
  @Service()
  export class BeanFactory {
      create() {
          console.log("bean created");
      }
  }
```

```typescript
  import {Service} from "typedi";
  
  @Service()
  export class SugarFactory {
      create() {
          console.log("sugar created");
      }
  }
```

```typescript
  import {Service} from "typedi";
  
  @Service()
  export class WaterFactory {
      create() {
          console.log("water created");
      }
  }
```

Here is the code of the CoffeeMaker that uses the other three services:

```typescript
  import {Service,Inject, Container} from "typedi";
  import {BeanFactory} from "./BeanFactory";
  import {SugarFactory} from "./SugarFactory";
  import {WaterFactory} from "./WaterFactory";
  
  @Service()
  export class CoffeeMaker {

      @Inject()
      beanFactory: BeanFactory = Container.get(BeanFactory);

      @Inject()
      sugarFactory: SugarFactory = Container.get(SugarFactory);

      @Inject()
      waterFactory: WaterFactory = Container.get(WaterFactory);

      make() {
          this.beanFactory.create();
          this.sugarFactory.create();
          this.waterFactory.create();
          console.log("coffee is made");
      }
  }
```


Although it looks a quite innocent code, it worth having a look at the generated JS:

Here's the code for `BeanFactory`:


```javascript
  "use strict";
  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var typedi_1 = require("typedi");
  var BeanFactory = /** @class */ (function () {
      function BeanFactory() {
      }
      BeanFactory.prototype.create = function () {
          console.log("bean created");
      };
      BeanFactory = __decorate([
          typedi_1.Service()
      ], BeanFactory);
      return BeanFactory;
  }());
  exports.BeanFactory = BeanFactory;
```

Instead here is the code for `CoffeeMaker`:

```javascript
  "use strict";
  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var typedi_1 = require("typedi");
  var BeanFactory_1 = require("./BeanFactory");
  var SugarFactory_1 = require("./SugarFactory");
  var WaterFactory_1 = require("./WaterFactory");
  var CoffeeMaker = /** @class */ (function () {
      function CoffeeMaker() {
          this.beanFactory = typedi_1.Container.get(BeanFactory_1.BeanFactory);
          this.sugarFactory = typedi_1.Container.get(SugarFactory_1.SugarFactory);
          this.waterFactory = typedi_1.Container.get(WaterFactory_1.WaterFactory);
      }
      CoffeeMaker.prototype.make = function () {
          this.beanFactory.create();
          this.sugarFactory.create();
          this.waterFactory.create();
          console.log("coffee is made");
      };
      __decorate([
          typedi_1.Inject(),
          __metadata("design:type", BeanFactory_1.BeanFactory)
      ], CoffeeMaker.prototype, "beanFactory", void 0);
      __decorate([
          typedi_1.Inject(),
          __metadata("design:type", SugarFactory_1.SugarFactory)
      ], CoffeeMaker.prototype, "sugarFactory", void 0);
      __decorate([
          typedi_1.Inject(),
          __metadata("design:type", WaterFactory_1.WaterFactory)
      ], CoffeeMaker.prototype, "waterFactory", void 0);
      CoffeeMaker = __decorate([
          typedi_1.Service()
      ], CoffeeMaker);
      return CoffeeMaker;
  }());
  exports.CoffeeMaker = CoffeeMaker;
```

## Dependency Injection with plain Typescript

Here I want to use dependecy injection without `typedi` framework, actually without any framework. 
Since Javascript (and Typescript) has high order functions we can easily achieve the follow:

* only one instance (we want singletons)
* no extra boilerplate
* clean syntax
* no messing around with `prototype` or `this`

As example, the code of `BeanFactory` would be:

```typescript
export interface BeanFactory {
    create(): void;
}

const beanFactory: BeanFactory = {
    create() {
        console.log("bean created");
    }
}
export default beanFactory;
```

We are exporting *just one* instance of BeanFactory (which satisfy the interface `BeanFactory`) and since we'll be using modules 
we are sure it is only loaded once (hence it will be a singleton). Clearly, it would also be possible to do use classes 
and just remove the `@Service` annotation as before.

We can also rewrite `CoffeeMaker` this way: 

  ```typescript
  import beanFactory  from "./BeanFactory";
  import sugarFactory from "./SugarFactory";
  import waterFactory from "./WaterFactory";
  
  export interface CoffeeMaker {
      make() : void
  }

  export function CoffeeMaker(
      createBean:  Function,
      createSugar: Function,
      createWater: Function ): CoffeeMaker {
      return {
          make() {
              createBean();
              createSugar();
              createWater();
              console.log("coffee is made");
          }
      }
  }
  const coffeeMaker = CoffeeMaker(beanFactory.create, sugarFactory.create, waterFactory.create)

  export default coffeeMaker;

```

Few things to note: `CoffeeMaker` is just a fuction that takes as input three functions, pretty standard here, the
other important fact is that since JS functions are first class citizens we can just pass them around like this: 

```javascript
const coffeeMaker = CoffeeMaker(beanFactory.create, sugarFactory.create, waterFactory.create)
```

Now we can have a look at the generated Javascript. First the `BeanFactory`:

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var beanFactory = {
    create: function () {
        console.log("bean created");
    }
};
exports.default = beanFactory;
```


And here's the code of the generated javascript for `CoffeeMaker`:

```javascript
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var BeanFactory_1 = require("./BeanFactory");
  var SugarFactory_1 = require("./SugarFactory");
  var WaterFactory_1 = require("./WaterFactory");
  function CoffeeMaker(createBean, createSugar, createWater) {
      return {
          make: function () {
              createBean();
              createSugar();
              createWater();
              console.log("coffee is made");
          }
      };
  }
  exports.CoffeeMaker = CoffeeMaker;
  var coffeeMaker = CoffeeMaker(BeanFactory_1.default.create, SugarFactory_1.default.create, WaterFactory_1.default.create);
  exports.default = coffeeMaker;
```

## Comments

The output generated by Typescript has become more compact and readable. It not far away from the original Typescript itself
after it has been stripped down of types. 

The big question would also be testability. Here's how we can mock the services, again without using `sinon` or any external
mocking framework:

```javascript
  let { CoffeeMaker } = require("../../build/compiled/just-typescript/CoffeeMaker.js");

  const mockBean  = () => console.log("fakeBean made");
  const mockSugar = () => console.log("fakeSugar made");
  const mockWater = () => console.log("fakeWater made");

  const coffeeMaker = CoffeeMaker( mockBean, mockSugar, mockWater);

  describe("mocking CoffeMaker instance", () => {
      it("should run the mocked ingredients", () => {
          let output = coffeeMaker.make();
          expect(true).toBe(true);
      });
  });
```

