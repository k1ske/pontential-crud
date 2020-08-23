import * as cors    from 'cors';
import {
    MiddlewareBase,
    MiddlewareHandler
}                   from '../interfaces/Middleware';
import {Middleware} from './Middleware';

@Middleware
class Cors implements MiddlewareBase
{
    private readonly options: cors.CorsOptions = {
        methods       : [
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'OPTIONS',
            'HEAD'
        ],
        allowedHeaders: [
            'content-type',
            'authorization'
        ],
        exposedHeaders: []
    };
    
    public middleware(): MiddlewareHandler {
        return cors(this.options);
    }
}
