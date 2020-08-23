import {Service}        from '../Injector';
import {
    HTTP_STATUS,
    METHODS,
    Route
}                       from '../services/RouterService';
import {
    NextFunction,
    Request,
    Response
}                       from 'express-serve-static-core';
import DeveloperService from '../services/DeveloperService';
import {FilterOptions}  from '../interfaces/FilterOptions';
import {ParsedQs}       from 'qs';

@Service
@Route('/developers')
class DeveloperController
{
    constructor(private developerService: DeveloperService) {
    }
    
    @Route('', METHODS.GET)
    private async filter(request: Request, response: Response, next: NextFunction) {
        if (!Object.keys(request.query).length) {
            next();
            
            return;
        }
        
        const developers = await this.developerService.getDevelopers(<Extract<ParsedQs, FilterOptions>>request.query);
        
        return response.status(HTTP_STATUS.OK).send(developers);
    }
    
    @Route('', METHODS.GET)
    private async getAll(request: Request, response: Response) {
        const developers = await this.developerService.getAllDevelopers();
        
        return response.status(HTTP_STATUS.OK).send(developers);
    }
    
    @Route(':id', METHODS.GET)
    private async get(request: Request, response: Response) {
        const developer = await this.developerService.getDeveloper(request.params.id);
        
        return response.status(HTTP_STATUS.OK).send(developer);
    }
    
    @Route('', METHODS.POST)
    private async post(request: Request, response: Response) {
        const developer = await this.developerService.createDeveloper(request.body);
        
        return response.status(HTTP_STATUS.OK).send(developer);
    }
    
    @Route(':id', METHODS.PUT)
    private async put(request: Request, response: Response) {
        const developer = await this.developerService.updateDeveloper(request.params.id, request.body);
        
        return response.status(HTTP_STATUS.OK).send(developer);
    }
    
    @Route(':id', METHODS.DELETE)
    private async delete(request: Request, response: Response) {
        const developer = await this.developerService.deleteDeveloper(request.params.id);
        
        return response.status(HTTP_STATUS.NO_CONTENT).send(developer);
    }
}
