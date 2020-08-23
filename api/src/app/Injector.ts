import 'reflect-metadata';
import UndefinedDependencyException from './exceptions/UndefinedDependencyException';

export class Injector
{
    private static instancesList: any[] = [];
    
    public static resolve<T extends Object>(target: Function): T {
        if (!target) {
            throw new UndefinedDependencyException();
        }
        
        const name: string = target.name;
        const found: undefined | T = Injector.instancesList.find((instance: T) => instance.constructor.name === name);
        
        if (found) {
            return found;
        }
        
        const params: Function[] = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = params.map((param) => Injector.resolve<Object>(param));
        
        Injector.instancesList.push(<T>Reflect.construct(target, injections));
        
        return <T>Injector.instancesList[Injector.instancesList.length - 1];
    }
}

export const Service = (target: Function) => {
    Injector.resolve<Object>(target);
};
