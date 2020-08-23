import * as http       from 'http';
import {config}        from 'dotenv';
import {Express}       from 'express';
import {RouterService} from './app/services/RouterService';
import {Service}       from './app/Injector';
import autoload        from './app/Autoload';
import {
    env,
    isDevelopment
}                      from './app/Helpers';

@Service
export default class App
{
    private httpServer: http.Server;
    
    constructor(private routerService: RouterService) {
        config();
        autoload();
        
        const port: number = parseInt(env('PORT', '3000'));
        this.httpServer = http.createServer(routerService.getRouter());
        this.httpServer.listen(port);
        
        if (isDevelopment()) {
            console.log(`The magic happens here: http://localhost:${port}`);
        }
    }
    
    public getExpressApp(): Express {
        return this.routerService.getRouter();
    }
    
    public terminate() {
        this.httpServer.close();
    }
}
