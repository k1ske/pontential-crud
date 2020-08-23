import * as express             from 'express';
import {
    Request,
    Response
}                               from 'express';
import {
    Injector,
    Service
}                               from '../Injector';
import * as httpContext         from 'express-http-context';
import {NextFunction}           from 'express-serve-static-core';
import {MethodDecoratorHandler} from '../interfaces/MethodDecoratorHandler';
import {ClassDecoratorHandler}  from '../interfaces/ClassDecoratorHandler';
import {ParamsConstraints}      from '../interfaces/ParamsConstraints';

export enum METHODS
{
    GET    = 'get',
    POST   = 'post',
    PUT    = 'put',
    PATCH  = 'patch',
    DELETE = 'delete',
    HEAD   = 'head'
}

export enum HTTP_STATUS
{
    OK          = 200,
    CREATED     = 201,
    NO_CONTENT  = 204,
    
    BAD_REQUEST = 400,
    NOT_FOUND   = 404,
}

export class PARAM
{
    static UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/;
}

export function Route(prefix: string | RegExp): ClassDecoratorHandler;
export function Route(path: string | RegExp, method: METHODS, constraints?: ParamsConstraints): MethodDecoratorHandler;

export function Route(...decoratorArgs: any): Function {
    return (...handlerArgs: any[] | any) => {
        if (handlerArgs.length === 3) {
            decorateRouteMethod
                .apply(undefined, decoratorArgs)
                .apply(undefined, handlerArgs);
        } else if (handlerArgs.length === 1) {
            decorateRouteClass
                .apply(undefined, decoratorArgs)
                .apply(undefined, handlerArgs);
        }
    };
}

@Service
export class RouterService
{
    private readonly router: express.Express;
    
    constructor() {
        this.router = express();
        this.router.disable('x-powered-by');
    }
    
    public getRouter(): express.Express {
        return this.router;
    }
}

function decorateRouteClass(prefix: string): ClassDecoratorHandler {
    return (target: Function) => {
        const instance: Object = Injector.resolve<Object>(target);
        
        if (!Reflect.has(instance, '__decoratorsMeta')) {
            Reflect.set(instance, '__decoratorsMeta', {});
        }
        
        let decoratorsMeta: any = <object>Reflect.get(instance, '__decoratorsMeta');
        decoratorsMeta.routePrefix = prefix;
    };
}

function decorateRouteMethod(path: string, method: METHODS = METHODS.GET, constraints: ParamsConstraints = {}): MethodDecoratorHandler {
    return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
        setImmediate(registerRoute, path, method, constraints, target, propertyKey, descriptor);
    };
}

function registerRoute(path: string, method: METHODS, constraints: ParamsConstraints, target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const routerService: RouterService = Injector.resolve<RouterService>(RouterService);
    const instance: Object = Injector.resolve<Object>(target.constructor);
    const finalPath =
              getInstanceRoutePrefix(instance)
                  .concat('/', path)
                  .replace(/\/+/g, '/')
                  .replace(/\/$/, '');
    
    routerService.getRouter().route(finalPath)[method]((request: Request, response: Response, next: NextFunction) => {
        const constraintsKeys = Object.keys(constraints);
        
        for (const key of constraintsKeys) {
            if (request.params[key] && !constraints[key].test(request.params[key])) {
                next();
                
                return;
            }
        }
        
        let ret: any;
        try {
            ret = descriptor.value.apply(instance, [request, response, next]);
        } catch (e) {
            handleRequestError(e);
        }
        
        if (Object.prototype.toString.call(ret) === '[object Promise]') {
            ret.catch(handleRequestError);
        }
    });
}

function handleRequestError(error: any): void {
    const response: Response = <Response>httpContext.get('response');
    const statusCode: HTTP_STATUS = error.statusCode || HTTP_STATUS.BAD_REQUEST;
    
    console.trace('TraceError');
    console.error(error);
    
    let body: any = {
        message: error.message
    };
    
    if (error.exceptionData) {
        body.exceptionData = error.exceptionData;
    }
    
    response.status(statusCode).send(body);
}

function getInstanceRoutePrefix(instance: any): string {
    if (!Reflect.has(instance, '__decoratorsMeta')) {
        return '';
    }
    
    const decoratorsMeta: any = <any[]>Reflect.get(instance, '__decoratorsMeta');
    
    if (!('routePrefix' in decoratorsMeta)) {
        return '';
    }
    
    return decoratorsMeta.routePrefix;
}
