import Exception from './Exception';

export default class UndefinedDependencyException extends Exception
{
    protected readonly CODE: number = 1000001;
    
    constructor() {
        super(`Trying to inject circular dependencies`);
    }
}
