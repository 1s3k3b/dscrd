import compile from '.';
import { Element, Types, Program, programDefault } from '../types/';

export default (object: Program) => {
    return compile([
        {
            type: Types.TOKEN,
            token: object.token || programDefault.token,
        },
        {
            type: Types.COMMANDS,
            commands: object.commands || programDefault.commands,
        },
        {
            type: Types.CASE_SENSITIVE,
            bool: object.caseSensitive || programDefault.caseSensitive,
        },
        {
            type: Types.BOTCEPTION,
            bool: object.botception || programDefault.botception,
        },
        {
            type: Types.NO_DM,
            bool: object.noDM || programDefault.noDM,
        },
        {
            type: Types.PREFIX,
            prefix: object.prefix || programDefault.prefix,
        },
        {
            type: Types.EVENTS,
            events: object.events || programDefault.events,
        },
    ] as Element[]);
};