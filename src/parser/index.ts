import { Element, Types } from '../types/';
import parseCommands from './command';
import parseEvents from './event';
import getLevel from './level';

export default (string: string): Element[] => {
    const out: Element[] = [];
    let index = 0;
    let ignore = 0;
    const split = string
        .replace(/#.+$/gm, '')
        .split('\n');
    for (const line of split) {
        if (ignore) {
            ignore--;
            continue;
        }
        const splitLine = line.split(/\s/g);
        const statement = splitLine[0]
            .toLowerCase()
            .trim();
        switch (statement) {
            case 'token':
                out.push({
                    type: Types.TOKEN,
                    token: splitLine[1].trim(),
                } as Element);
                break;
            case 'prefix':
                out.push({
                    type: Types.PREFIX,
                    prefix: splitLine[1],
                });
            case 'casesensitive':
                out.push({
                    type: Types.CASE_SENSITIVE,
                    bool: splitLine[1].toLowerCase() === 'false' ? false : true,
                } as Element);
                break;
            case 'nodm':
                out.push({
                    type: Types.NO_DM,
                    bool: splitLine[1].toLowerCase() === 'false' ? false : true,
                } as Element);
                break;
            case 'botception':
                out.push({
                    type: Types.BOTCEPTION,
                    bool: splitLine[1].toLowerCase() === 'false' ? false : true,
                } as Element);
                break;
            case 'commands': {
                const { amount, level } = getLevel(split, index);
                let _ignore = 0;
                const commands = split
                    .filter((_, i) => i > index && i <= index + amount)
                    .map(l => l.slice(level))
                    .reduce((ac, l, i, a) => {
                        if (_ignore) {
                            _ignore--;
                            return ac;
                        }
                        const { amount: _amount, level: _level } = getLevel(a, i);
                        _ignore = _amount;
                        const res = a
                            .filter((_, _i) => _i > i && _i <= i + _amount)
                            .map(l => l.slice(_level));
                        return [...ac, [l, ...res]];
                    }, [] as string[][]);
                    out.push({
                        type: Types.COMMANDS,
                        commands: parseCommands(commands),
                    });
                break;
            }
            case 'events': {
                const { amount, level } = getLevel(split, index);
                let _ignore = 0;
                const events = split
                    .filter((_, i) => i > index && i <= index + amount)
                    .map(l => l.slice(level))
                    .reduce((ac, l, i, a) => {
                        if (_ignore) {
                            _ignore--;
                            return ac;
                        }
                        const { amount: _amount, level: _level } = getLevel(a, i);
                        _ignore = _amount;
                        const res = a
                            .filter((_, _i) => _i > i && _i <= i + _amount)
                            .map(l => l.slice(_level));
                        return [...ac, [l, ...res]];
                    }, [] as string[][]);
                    out.push({
                        type: Types.EVENTS,
                        events: parseEvents(events),
                    });
                break;
            }
        }
        index++;
    }
    return out;
}

export const command = parseCommands;
export const event = parseEvents;