How to do Dependency Injection in Typescript with and without `typedi` (or any other framework).


## Using TypeDI (example from the docs)
This example is taken directly from the `typedi` documentation. It's quite straightforward, there are three injected dependency
and CoffeeMaker uses all of them to call the `create` method. Note: all of the instances are singletons.


### BeanFactory, and other dependencies

`BeanFactory` is a dependency and  it's marked with the decorator as `@Service`:

```typescript
  import {Service} from "typedi";

  @Service()
  export class BeanFactory {
      create() {
          console.log("bean created");
      }
  }
```

Innocent looking code, but it worth having a look at the generated Javascript:

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

The first definition is about `__decorate`. Since decorators are not (yet) standard [TC39 Proposal](https://github.com/tc39/proposals)
**every file** that would use the `@Service` (or any other decoratos) carries along that definition.

The class definition in Javascript follows the typical IIFE, here's the same code rewritten for readability:

```javascript
  var BeanFactory = (function () {
      function BeanFactory() { }

      BeanFactory.prototype.create = function () {
          console.log("bean created");
      };

      BeanFactory = __decorate([
          typedi_1.Service()
      ], BeanFactory);

      return BeanFactory;
  }());
```

Important to notice those lines where there is a call to `__decorate` and `Service()`. In a very simplified way what
the decorator is actually doing is storing `BeanFactory` in a hidden Container together with other properties
so that it could be later used by another class when referenced via `@Inject`.

> Note: For more details see [Service.ts](https://github.com/typestack/typedi/blob/master/src/decorators/Service.ts)

In brevity, the `Container` is an object used by `typedi` to store instaces maked with `@Service` or references by `@Inject`.

Similarly, the other dependencies are defined in the following way:

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
### CoffeeMaker

So far we have seen how classes would be decorated with `@Service`. The goal of the `@Inject` decorator
instead is to load the dependency from the `Container`.

Here is the code of the CoffeeMaker injecting all the services:

```typescript
  import {Service,Inject, Container} from "typedi";
  import {BeanFactory} from "./BeanFactory";
  import {SugarFactory} from "./SugarFactory";
  import {WaterFactory} from "./WaterFactory";

  @Service()
  export class CoffeeMaker {

      @Inject()
      beanFactory: BeanFactory;

      @Inject()
      sugarFactory: SugarFactory;

      @Inject()
      waterFactory: WaterFactory;

      make() {
          this.beanFactory.create();
          this.sugarFactory.create();
          this.waterFactory.create();
          console.log("coffee is made");
      }
  }
```

Note there's no constructor, however we have to `@Inject` all the dependencies we need to use.

Inside the `make()` method we are referencing to instance variables such as `this.beanFactory`. Where do these variables come from?
Those variable are "magically" instantited by `@Inject`.

> Note: Magic should be avoided as a general rule of thumb. Better being explicit.

Looking at the generated Javascritp we'll see this:

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

Again, we see the ubiquitous `__decorator` definition. It would look standard Javascript, if it wasn't for the decorations.
It's important to discuss what this code is doing:

```javascript
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
```

At runtime, after the declaration of the function `CoffeeMaker` and after setting the prototype to hold the `make()` there
are three calls to `__decorate`, one for each dependency. We can clearly see how the dependencies are attached to
`CoffeeMaker.prototype`.

Note that in totals only fo the `CoffeeMaker` there are:

* *4 calls to `_decorate()`*,
* *3 calls to `Inject()`*, and
* *1 call to `Service()`*

Magic does not come from free after all.

## Dependency Injection with plain Typescript

Here I want to demonstrate how it is possible to achieve dependecy injection without `typedi` framework,
actually without any framework. Since Javascript (and Typescript) has high order functions we can easily achieve the follow:

* only one instance (singletons)
* no extra boilerplate
* clean syntax
* bonus points, no scary JS, there's no need to touch `prototype`


### Dependecy Injection using Functions

We could just use functions and objects instead of using Classes (after all everybody knows that Javascript does not have real classes).
The code of `BeanFactory` would be:

```typescript
export interface BeanFactory {
    create () : void;
}

export const beanFactory : BeanFactory = {
    create() {
        console.log("bean created");
    }
}
```

Quite simply, we are exporting *just one* object that satisfies the interface `BeanFactory` and since we'll be using modules
we are sure it is only loaded once (hence it will be a singleton).

Now we can have a look at the generated Javascript. First the `BeanFactory`:

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beanFactory = {
    create: function () {
        console.log("bean created");
    }
};
```
It's basically the same code, stripped of types definitions.

Similarly, we can also rewrite `CoffeeMaker` this way:

```typescript
  import beanFactory  from "./BeanFactory";
  import sugarFactory from "./SugarFactory";
  import waterFactory from "./WaterFactory";

  export interface CoffeeMaker {
      make() : void
  }

  export function createCoffeeMaker(
      createBean:  Function,
      createSugar: Function,
      createWater: Function): CoffeeMaker {
      return {
          make() {
              createBean();
              createSugar();
              createWater();
              console.log("coffee is made");
          }
      }
  }
```

We simply pass the dependecies to the `CoffeeMaker` which is simply a function, and we can use those dependencies
since they live in the "closure" of the `make()` function. The other important fact is that since Typescript (and Javascript)
functions are first class citizens we can just pass them around like this:

```javascript
const coffeeMaker = createCoffeeMaker(beanFactory.create, sugarFactory.create, waterFactory.create)
```

Here's the code of the generated javascript for `CoffeeMaker`:

```javascript
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var BeanFactory_1 = require("./BeanFactory");
  var SugarFactory_1 = require("./SugarFactory");
  var WaterFactory_1 = require("./WaterFactory");
  function createCoffeeMaker(createBean, createSugar, createWater) {
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
```



#### What if I need more than 3 dependencies, should I pass all of them in the constructor?

Short answer: Yes.

Anything using more than a bunch of dependencies exposes bigger problems in terms of software architecture design.
We need to ask ourselves:

* Single responsability principle: Is that function/class trying to do too many things?
* Would breaking the function/class in smaller modules help?



### Dependecy Injection using Classes

It's obviously possible to recreate the sample examples with classes.

The `BeanFactory` would be:

```typescript
export class BeanFactory {
    create() {
        console.log("bean created");
    }
}

export const beanFactory = new BeanFactory();
```

> Note: Since we are not using a framework to do that for us, we have to create the singleton manually

And the relative generate code in Javascript is:

```javascript
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var BeanFactory = /** @class */ (function () {
      function BeanFactory() {
      }
      BeanFactory.prototype.create = function () {
          console.log("bean created");
      };
      return BeanFactory;
  }());
  exports.BeanFactory = BeanFactory;
  exports.beanFactory = new BeanFactory();
```

The `CoffeeMaker` class would be:

```typescript
  import {BeanFactory, beanFactory}  from "./BeanFactory";
  import {SugarFactory, sugarFactory} from "./SugarFactory";
  import {WaterFactory, waterFactory} from "./WaterFactory";

  export class CoffeeMaker {
      constructor(
          public beanFactory: BeanFactory,
          public sugarFactory: SugarFactory,
          public waterFactory: WaterFactory) {}

      make() {
          this.beanFactory.create();
          this.sugarFactory.create();
          this.waterFactory.create();
          console.log("coffee is made");
      }
  }
```

And the relative generated Javascript:

```javascript
  Object.defineProperty(exports, "__esModule", { value: true });
  var BeanFactory_1 = require("./BeanFactory");
  var SugarFactory_1 = require("./SugarFactory");
  var WaterFactory_1 = require("./WaterFactory");
  var CoffeeMaker = /** @class */ (function () {
      function CoffeeMaker(beanFactory, sugarFactory, waterFactory) {
          this.beanFactory = beanFactory;
          this.sugarFactory = sugarFactory;
          this.waterFactory = waterFactory;
      }
      CoffeeMaker.prototype.make = function () {
          this.beanFactory.create();
          this.sugarFactory.create();
          this.waterFactory.create();
          console.log("coffee is made");
      };
      return CoffeeMaker;
  }());
  exports.CoffeeMaker = CoffeeMaker;
```

Pretty standard classes (or better say fake classes a-la-Javascript) but there is no extra defitions due to decorators.

## Using CoffeeMaker

If we would use `typedi` our main would be:

```typescript
  import "reflect-metadata";
  import {Container} from "typedi";
  import {CoffeeMaker} from "./CoffeeMaker";

  let coffeeMaker = Container.get(CoffeeMaker);
  coffeeMaker.make();
```

Clearly, one advantage is that we don't have to worry about passing dependencies to CoffeeMaker,
since it's `typedi` doing it for us.

Using instead plain classes:

```typescript
  import {beanFactory}  from "./BeanFactory";
  import {sugarFactory} from "./SugarFactory";
  import {waterFactory} from "./WaterFactory";
  import {CoffeeMaker} from "./CoffeeMaker";

  let coffeeMaker = new CoffeeMaker(beanFactory, sugarFactory, waterFactory);
  coffeeMaker.make();
```

It means we have to manually import the singletons, and explicitly passing those dependencies to `CoffeeMaker`.

### Is it bad to pass those dependencies manually?

Maybe we should ask this question after reading this code:

```
  let coffeeMaker = Container.get(CoffeeMaker);
```

Can you say what are the dependencies of used by CoffeeMaker?

Let's read instead this:

```
  let coffeeMaker = new CoffeeMaker(beanFactory, sugarFactory, waterFactory);
```

It might be my personal opinion here, but I think it is better to know at declaration time what are
the dependencies that a `coffeeMaker` instance would need.

## Lines of code and readability

Once again let's see both code next to each other:

```typescript
// Using typedi for Dependency Injection
@Service()
export class CoffeeMaker {
    @Inject() beanFactory: BeanFactory;
    @Inject() sugarFactory: SugarFactory;
    @Inject() waterFactory: WaterFactory;

    make() {
        this.beanFactory.create();
        this.sugarFactory.create();
        this.waterFactory.create();
        console.log("coffee is made");
    }
}

// Using simple Classes
export class CoffeeMaker {
    constructor(
        public beanFactory: BeanFactory,
        public sugarFactory: SugarFactory,
        public waterFactory: WaterFactory) {}

    make() {
        this.beanFactory.create();
        this.sugarFactory.create();
        this.waterFactory.create();
        console.log("coffee is made");
    }
}
```

We are literally writing the same amount of lines of code in both cases (in Typescript), although we already know
that using decorators would automatically add extra lines to support `__decorate`, `typedi.Inject()`, `typedi.Service()`
in the generated Javascript files.

## Memory usage

So far we know that `typedi` uses a _Container_ to hold reference of relevant instances that would be later injected.

However, we could simply rely on the module system. In simple terms, NodeJS module system only load each module once, so that each time we'd require again the same module the JS
engine will find that reference in memory. Check [Module Caching](https://nodejs.org/api/modules.html#modules_caching) for more details:

> Modules are cached after the first time they are loaded. This means (among other things)
that every call to require('foo') will get exactly the same object returned, if it would resolve to the same file.

By creating one instance per module (like we did in the example) we are effectively creating singletons.

### Note: Do we really need singletons?

Singletons are only useful when they need to hold "state" of a particular feature, and that feature needs to be unique,
for example a good candidate for a singleton would be a database connection. Having to use singleton **everywhere all the time**
is already a _code smell_.

If we are after classes that only have "class methods", then it's easier to use Typescript `namespaces`.

## Testability using Dependency Injection with Function

We can easily mock each functions like this:

```javascript
  let { CoffeeMaker } = require("../../build/compiled/just-typescript/CoffeeMaker.js");

  const mockBean  = () => console.log("fakeBean made");
  const mockSugar = () => console.log("fakeSugar made");
  const mockWater = () => console.log("fakeWater made");

  const coffeeMaker =  createCoffeeMaker( mockBean, mockSugar, mockWater);

  describe("mocking CoffeMaker instance", () => {
      it("should run the mocked ingredients", () => {
          let output = coffeeMaker.make();
          expect(true).toBe(true);
      });
  });
```

## Conclusions: Just bin typedi

Use dependency injection via constructors parameters or even better via functions.

