import { Command } from '../types/';
import { SyntaxError } from '../errors/';

export default (commands: string[][]) => {
    const out: Command[] = [];
    for (const cmd of commands) {
        const data: Command = {};
        let index = 0;
        statements: for (const statement of cmd) {
            const split = statement.split(/\s+/g);
            const name = split[0].toLowerCase();
            switch (name) {
                case 'command':
                    data.name = split[1];
                    break;
                case 'aliases':
                    data.aliases = split.slice(1).map(a => a.trim()).filter(x => x);
                    break;
                case 'run':
                case 'fn':
                case 'reply':
                    let code;
                    if (split.slice(1).join('').trim().length) code = `reply('${split.slice(1).join(' ').trim()}')`;
                    else code = cmd
                        .filter((_, i) => i > index)
                        .join('\n');
                    data.run = code;
                    break statements;
                default:
                    throw new SyntaxError('UNKNOWN_STATEMENT', statement);
            }
            index++;
        }
        out.push(data as Command);
    }
    return out;
};