import {
    NextFunction,
    Request,
    Response
}                from 'express-serve-static-core';
import {Express} from 'express';

export interface MiddlewareHandler
{
    (request: Request, response: Response, next: NextFunction): void;
}

export interface MiddlewareBase
{
    middleware(): MiddlewareHandler;
    
    priority?(): number;
    
    after?(router: Express): void;
}
