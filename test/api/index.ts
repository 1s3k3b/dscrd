// @ts-ignore
~((a,b=require('util')[a])=>Object.prototype[b.defaultOptions.depth=1/0,a]=function(){return b(this,{customInspect:0})})('inspect');

import { parser, compiler } from '../../src/';
import { readFileSync, writeFileSync } from 'fs';

console.log(parser(readFileSync('test/main.dscrd', 'utf8')));
writeFileSync('test/api/main.js', compiler(readFileSync('test/main.dscrd', 'utf8')));