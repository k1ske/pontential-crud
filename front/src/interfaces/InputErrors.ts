export interface InputErrors
{
    hasErrors: boolean;
    validationErrors: { [key: string]: string[] };
}
