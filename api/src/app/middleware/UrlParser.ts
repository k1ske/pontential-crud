import {urlencoded} from 'body-parser';
import {Middleware} from './Middleware';
import {
    MiddlewareBase,
    MiddlewareHandler
}                   from '../interfaces/Middleware';

@Middleware
class UrlParser implements MiddlewareBase
{
    public middleware(): MiddlewareHandler {
        return urlencoded({extended: true});
    }
    
    public priority(): number {
        return 2;
    }
}
