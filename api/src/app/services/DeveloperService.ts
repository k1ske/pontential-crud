import {Service}           from '../Injector';
import DeveloperDto        from '../dtos/DeveloperDto';
import {InputErrors}       from '../interfaces/InputErrors';
import {HttpException}     from '../exceptions/HttpException';
import {HTTP_STATUS}       from './RouterService';
import Developer           from '../models/Developer';
import {FilterOptions}     from '../interfaces/FilterOptions';
import {PaginationResults} from '../interfaces/PaginationResults';
import {
    Op,
    Sequelize
}                          from 'sequelize';

@Service
export default class DeveloperService
{
    public getAllDevelopers() {
        return Developer.findAll();
    }
    
    public getDevelopers(filter: FilterOptions | null): Promise<PaginationResults<Developer>> {
        return Developer.paginate({
            where: Sequelize.where(Sequelize.fn('lower', Sequelize.fn('unaccent ', Sequelize.col('nome'))), Op.like, Sequelize.fn('lower', Sequelize.fn('unaccent ', `%${filter?.query || ''}%`)))
        }, {
            page   : filter?.page,
            perPage: filter?.perPage
        });
    }
    
    public async getDeveloper(id?: string): Promise<Developer> {
        let developer: Developer | null;
        
        if (!id || !(developer = await Developer.findByPk(id))) {
            throw new HttpException('Não foi possível encontrar o desenvolvedor', HTTP_STATUS.NOT_FOUND);
        }
        
        return developer;
    }
    
    public async createDeveloper(developerDTO: DeveloperDto): Promise<Developer> {
        const inputErrors = DeveloperService.inputErrors(developerDTO);
        
        if (inputErrors.hasErrors) {
            throw new HttpException('Não foi possível inserir o desenvolvedor', HTTP_STATUS.BAD_REQUEST, inputErrors);
        }
        
        return await Developer.create(developerDTO);
    }
    
    public async updateDeveloper(id: string, developerDTO: DeveloperDto): Promise<Developer> {
        const inputErrors = DeveloperService.inputErrors(developerDTO);
        
        if (inputErrors.hasErrors) {
            throw new HttpException('Não foi possível atualizar o desenvolvedor', HTTP_STATUS.BAD_REQUEST, inputErrors);
        }
        
        const developer = await Developer.findByPk(id);
        
        if (!developer) {
            throw new HttpException('Não foi possível encontrar o desenvolvedor', HTTP_STATUS.NOT_FOUND);
        }
        
        developer.setAttributes(developerDTO);
        await developer.save();
        
        return developer;
    }
    
    public async deleteDeveloper(id: string): Promise<boolean> {
        return !!await Developer.destroy({
            where: {
                id
            }
        });
    }
    
    private static inputErrors(developer: DeveloperDto): InputErrors {
        let inputErrors: InputErrors = {
            hasErrors       : false,
            validationErrors: {}
        };
        
        if (!developer.nome) {
            inputErrors.validationErrors.nome = [
                'O campo nome é obrigatório'
            ];
        }
        
        if (!developer.idade) {
            inputErrors.validationErrors.idade = [
                'O campo idade é obrigatório'
            ];
        }
        
        if (!developer.hobby) {
            inputErrors.validationErrors.hobby = [
                'O campo hobby é obrigatório'
            ];
        }
        
        if (!developer.datanascimento) {
            inputErrors.validationErrors.datanascimento = [
                'O campo data de nascimento é obrigatório'
            ];
        } else {
            const bornDate = new Date(Date.parse(developer.datanascimento));
            
            if (bornDate.toString() === 'Invalid Date') {
                inputErrors.validationErrors.datanascimento = [
                    'Data de nascimento inválida'
                ];
            } else if (developer.idade && DeveloperService.validateAge(bornDate, developer.idade)) {
                inputErrors.validationErrors.datanascimento = [
                    'Data de nascimento não condiz com a idade'
                ];
            }
        }
        
        inputErrors.hasErrors = !!Object.keys(inputErrors.validationErrors).length;
        
        return inputErrors;
    }
    
    private static validateAge(date: Date, age: number): boolean {
        const OneYearMs = 60 * 60 * 24 * 365 * 1000;
        const currentDate = new Date();
        const dif = Math.trunc((currentDate.getTime() - date.getTime()) / OneYearMs);
        
        return dif !== age;
    }
}
