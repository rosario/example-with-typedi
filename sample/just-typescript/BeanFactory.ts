export interface BeanFactory {
    create () : void;
}

export const beanFactory : BeanFactory = {
    create() {
        console.log("bean created");
    }
}
