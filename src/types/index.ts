export enum Types {
    TOKEN,
    COMMANDS,
    CASE_SENSITIVE,
    BOTCEPTION,
    NO_DM,
    PREFIX,
    EVENTS,
}
export interface Program {
    prefix?: string;
    token?: string;
    caseSensitive?: boolean;
    botception?: boolean;
    noDM?: boolean;
    commands?: Command[];
    events?: Event[];
}
export interface Command {
    name?: string;
    aliases?: string[];
    run?: string;
}
export interface Event {
    name: string;
    run: string;
}
export interface Element {
    type: Types;
    token?: string;
    commands?: Command[];
    events?: Event[];
    bool?: boolean;
    prefix?: string;
}
export const programDefault: Program = {
    prefix: '!',
    token: '',
    caseSensitive: true,
    botception: true,
    noDM: false,
    commands: [],
    events: [],
};