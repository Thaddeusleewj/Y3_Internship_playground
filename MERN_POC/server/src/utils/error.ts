// Custom error handler
export const errorHandler = (statusCode: number, message: string): Error => {
    const error: any = new Error(message);
    error.StatusCode = statusCode;
    error.message = message;
    return error;
}