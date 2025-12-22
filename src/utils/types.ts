const isArray = (val: unknown[]) => Array.isArray(val);
const isObj = (val: unknown) => typeof val === 'object' && val !== null;
const isString = (val: unknown) => typeof val === 'string';
const isNumber = (val: unknown) => typeof val === 'number';
const isOptional = (val: unknown) => val === undefined;

export const typesLib = {
    isArray,
    isObj,
    isString,
    isNumber,
    isOptional,
};
