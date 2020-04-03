import { Error } from 'mongoose';

export const getValidationErrorMessage = (err: Error.ValidationError): string => {
    let result: string = 'Validation failed. ';
    Object.values(err.errors)
        .map((err: any) => `${err.message} `)
        .forEach((message: string) => result = `${result}${message} `);
    return result.substring(0, result.length - 1);
};
