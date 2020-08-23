export interface MethodDecoratorHandler
{
    (target: Object, propertyKey: string, descriptor: PropertyDescriptor): void;
}
