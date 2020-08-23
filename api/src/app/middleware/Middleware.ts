import {Injector}       from '../Injector';
import {RouterService}  from '../services/RouterService';
import {MiddlewareBase} from '../interfaces/Middleware';
import {clearImmediate} from 'timers';
import Immediate = NodeJS.Immediate;

export function Middleware(target: Function) {
    MiddlewareHandler.pushMiddleware(target);
}

class MiddlewareHandler
{
    private static middlewareList: MiddlewareBase[] = [];
    private static taskRegister: Immediate;
    private static routerService: RouterService = Injector.resolve<RouterService>(RouterService);
    
    public static pushMiddleware(target: Function) {
        MiddlewareHandler.middlewareList.push(Injector.resolve<MiddlewareBase>(target));
        
        MiddlewareHandler.registerMiddlewares();
    }
    
    private static registerMiddlewares() {
        if (MiddlewareHandler.taskRegister) {
            clearImmediate(MiddlewareHandler.taskRegister);
        }
        
        MiddlewareHandler.taskRegister = setImmediate(() => {
            MiddlewareHandler.middlewareList
                             .sort((a, b) => {
                                 const priorityA = a.priority ? a.priority() : 0;
                                 const priorityB = b.priority ? b.priority() : 0;
                
                                 return priorityA < priorityB ? 1 : -1;
                             })
                             .forEach(MiddlewareHandler.registerMiddleware);
        });
    }
    
    private static registerMiddleware(middleware: MiddlewareBase) {
        MiddlewareHandler.routerService.getRouter().use(middleware.middleware());
        
        if (middleware.after) {
            middleware.after(MiddlewareHandler.routerService.getRouter());
        }
    }
}
