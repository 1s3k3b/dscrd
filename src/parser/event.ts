import { Event } from '../types/';
import { SyntaxError } from '../errors/';

export default (events: string[][]) => {
    const out: Event[] = [];
    for (const ev of events) {
        const data: Event = {
            name: 'ready',
            run: '',
        };
        let index = 0;
        statements: for (const statement of ev) {
            const split = statement.split(/\s+/g);
            const name = split[0].toLowerCase();
            switch (name) {
                case 'event':
                    data.name = split[1];
                    break;
                case 'run':
                case 'fn':
                case 'reply':
                    let code;
                    if (split.slice(1).join('').trim().length) code = `reply('${split.slice(1).join(' ').trim()}')`;
                    else code = ev
                        .filter((_, i) => i > index)
                        .join('\n');
                    data.run = code;
                    break statements;
                default:
                    throw new SyntaxError('UNKNOWN_STATEMENT', statement);
            }
            index++;
        }
        out.push(data as Event);
    }
    return out;
};