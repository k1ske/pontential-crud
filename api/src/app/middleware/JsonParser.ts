import {json}       from 'body-parser';
import {Middleware} from './Middleware';
import {
    MiddlewareBase,
    MiddlewareHandler
}                   from '../interfaces/Middleware';

@Middleware
class JsonParser implements MiddlewareBase
{
    public middleware(): MiddlewareHandler {
        return json();
    }
    
    public priority(): number {
        return 2;
    }
}
