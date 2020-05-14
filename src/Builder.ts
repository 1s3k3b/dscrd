import { Program, Command, Event, programDefault } from './types';
import fromJSON from './compiler/fromJSON';

export default class Builder {
    public data: Program = programDefault;
    constructor(data: Program = {}) {
        Object
            .keys(programDefault)
            .forEach(e => {
                Object.defineProperty(this.data, e as keyof Program, {
                    value: (data[e as keyof Program] || programDefault[e as keyof Program]),
                });
            });
    }
    public prefix(d: string) {
        this.data.prefix = d;
        return this;
    }
    public token(d: string) {
        this.data.token = d;
        return this;
    }
    public caseSensitive(d: boolean) {
        this.data.caseSensitive = d;
        return this;
    }
    public botception(d: boolean) {
        this.data.botception = d;
        return this;
    }
    public noDM(d: boolean) {
        this.data.noDM = d;
        return this;
    }
    public commands(d: Command[], override?: boolean) {
        if (override) this.data.commands!.push(...d);
        else this.data.commands = d;
        return this;
    }
    public command(d: Command) {
        this.data.commands!.push(d);
        return this;
    }
    public events(d: Event[], override?: boolean) {
        if (override) this.data.events!.push(...d);
        else this.data.events = d;
        return this;
    }
    public event(d: Event) {
        this.data.events!.push(d);
        return this;
    }
    public build() {
        return fromJSON(this.data);
    }
    public toString() {
        return this.build();
    }
}