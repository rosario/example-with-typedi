"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var beanFactory = {
    create: function () {
        console.log("bean created");
    }
};
// It's also possible to just use a class instead
// export class BeanFactory {
//     create() {
//         console.log("bean created");
//     }
// }
// const beanFactory = new BeanFactory();
exports.default = beanFactory;
//# sourceMappingURL=BeanFactory.js.map