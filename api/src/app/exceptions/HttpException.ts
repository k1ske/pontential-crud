import {HTTP_STATUS} from '../services/RouterService';
import Exception     from './Exception';

export class HttpException extends Exception
{
    protected readonly CODE: number;
    public statusCode: HTTP_STATUS;
    public exceptionData: any;
    
    constructor(message: string, statusCode: HTTP_STATUS = HTTP_STATUS.BAD_REQUEST, exceptionData: any = null) {
        super(message);
        
        this.statusCode = statusCode;
        this.exceptionData = exceptionData;
    }
}
