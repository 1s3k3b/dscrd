import Messages from './Messages';

function makeError(BaseError: typeof Error) {
    class DSCRDError extends BaseError {
        constructor(type: keyof typeof Messages, ...keys: any[]) {
            super(Messages[type](...keys));
        }
    }
    return DSCRDError;
};

const Syntax = makeError(SyntaxError);
export { Syntax as SyntaxError };