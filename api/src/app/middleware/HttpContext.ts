import {Middleware}     from './Middleware';
import * as httpContext from 'express-http-context';
import {
    Express,
    NextFunction,
    Request,
    Response
}                       from 'express';
import {
    MiddlewareBase,
    MiddlewareHandler
}                       from '../interfaces/Middleware';

@Middleware
class HttpContext implements MiddlewareBase
{
    public middleware(): MiddlewareHandler {
        return httpContext.middleware;
    }
    
    public priority(): number {
        return 1;
    }
    
    public after(router: Express) {
        router.use((request: Request, response: Response, next: NextFunction): void => {
            httpContext.set('request', request);
            httpContext.set('response', response);
            
            next();
        });
    }
}
