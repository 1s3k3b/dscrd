#!/usr/bin/env node
import { compiler, fromJSON, Builder } from '../src/';
import getLevel from '../src/parser/level';
import { readFileSync, writeFileSync, } from 'fs';

enum States {
    TOKEN,
    PREFIX,
    CASE_SENSITIVE,
    BOTCEPTION,
    NO_DM,
}

const [,, ...args] = process.argv;
if (!args.length) {
    console.log('DSCRD CLI\n\ndscrd build <to>.js\nBuilds a DSCRD app interactively\n\ndscrd <from>.dscrd <to>.js\nCompiles a DSCRD file to a JS file\n\ndscrd <from>.json <to>.js\nCompiles a JSON fine to a DSCRD file');
} else if (args[0] === 'build') {
    let state = States.TOKEN;
    const builder = new Builder();
    console.log('Press ^C (Ctrl+C) any time to quit.\n');
    process.stdout.write('Bot Token: ');
    process.stdin.resume();
    process.stdin.on('data', (d: Buffer) => {
        const input = `${d}`.trim();
        switch (state) {
            case States.TOKEN:
                builder.token(input);
                state = States.PREFIX;
                process.stdout.write('Prefix: ');
                break;
            case States.PREFIX:
                builder.prefix(input);
                state = States.CASE_SENSITIVE;
                process.stdout.write('Case Sensitive (true/false): ');
                break;
            case States.CASE_SENSITIVE:
                builder.caseSensitive(input.toLowerCase() === 'false' ? false : true);
                state = States.BOTCEPTION;
                process.stdout.write('Ignore Bots (true/false): ');
                break;
            case States.BOTCEPTION:
                builder.botception(input.toLowerCase() === 'false' ? false : true);
                state = States.NO_DM;
                process.stdout.write('Ignore DMs (true/false): ');
                break;
            case States.NO_DM:
                builder.noDM(input.toLowerCase() === 'false' ? false : true);
                console.log('Commands and Events are not yet supported.');
                writeFileSync(args[1], builder.build());
                console.log('Successfully built app into ' + args[1]);
                break;
        }
    });
} else if (args[0].endsWith('.json')) {
    writeFileSync(args[1], fromJSON(JSON.parse(readFileSync(args[0], 'utf8'))));
    console.log('Successfully compiled ' + args[0] + ' to ' + args[1]);
} else if (args[1].endsWith('.js')) {
    writeFileSync(args[1], compiler(readFileSync(args[0], 'utf8')));
    console.log('Successfully compiled ' + args[0] + ' to ' + args[1]);
}
