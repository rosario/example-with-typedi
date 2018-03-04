export interface BeanFactory {
    create () : void;
}

const beanFactory : BeanFactory = {
    create() {
        console.log("bean created");
    }
}

// It's also possible to just use a class instead

// export class BeanFactory {
//     create() {
//         console.log("bean created");
//     }
// }
// const beanFactory = new BeanFactory();

export default beanFactory;
