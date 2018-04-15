export class BeanFactory {
    create() {
        console.log("bean created");
    }
}

export const beanFactory = new BeanFactory();

