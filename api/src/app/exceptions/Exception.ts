export default abstract class Exception extends Error
{
    protected abstract readonly CODE: number;
    
    protected constructor(message: string) {
        super(message);
    }
}
