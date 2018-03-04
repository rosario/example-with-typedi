export interface BeanFactory {
    create(): void;
}
declare const beanFactory: BeanFactory;
export default beanFactory;
