import parser, { command, event } from './parser/';
import compiler, { fromJSON } from './compiler/';
import Builder from './Builder';

export default compiler;
export { parser, command as parseCommands, event as parseEvents, compiler, fromJSON, Builder };
export * from './types/';