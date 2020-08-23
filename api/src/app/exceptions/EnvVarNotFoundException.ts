import Exception from './Exception';


export default class EnvVarNBotFoundException extends Exception
{
    protected readonly CODE: number = 1000001;
    
    constructor(varName: string) {
        super(`Variável "${varName}" de ambiente não definida.`);
    }
}
