import parse from '../parser/';
import { Command, Event, Types, Element } from '../types';
import fromJSON from './fromJSON';

export default (data: string | Element[]): string => {
    const escape = (s: string | string[]): string | string[] =>
        Array.isArray(s as string[])
            ? (s as string[]).map((t: string) => escape(t) as string)
            : (s as string).replace(/\'/g, '\\\'');
    const tree = typeof data === 'string' ? parse(data) : (data as Element[]);
    let js = `const { Client } = require('discord.js');
const client = new Client();
const commands = [];
const events = [];
let prefix = '';
let caseSensitive = false;
let botception = true;
let noDM = false;
client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  if (botception && message.author.bot) return;
  if (noDM && !message.guild) return;
  const [ command, ...args ] = message.content
    .slice(prefix.length)
    .split(/\\s+/g);
  const foundCommand = caseSensitive
    ? commands.find(c =>
      c.name.toLowerCase() === command.toLowerCase()
      || c.aliases
        .map(a => a.toLowerCase())
        .includes(command.toLowerCase())
    )
    : commands.find(c => c.name === command || c.aliases.includes(command));
  if (!foundCommand) return;
  const reply = message.channel.send.bind(message.channel);
  const random = (x, max) => {
    if (Array.isArray(x)) return x[~~(Math.random() * x.length)];
    x = +x;
    max = +max;
    x = Math.min(x, max);
    max = Math.max(x, max);
    return ~~(Math.random() * (max - x)) + x;
  };
  eval(foundCommand.run);
});
`;
    for (const el of tree) {
        switch (el.type) {
            case Types.TOKEN:
                js += `client.login('${el.token!}');\n`;
                break;
            case Types.COMMANDS:
                for (const cmd of el.commands!) {
                    js += `commands.push({\n  ${
                        Object
                            .keys(cmd)
                            .map(k => {
                                const v = escape(cmd[k as keyof Command]!);
                                return `${k}: ${Array.isArray(v as string[]) ? '[\'' + (v as string[]).join('\', \'') + '\']' : `${(v as string).includes('\n') ? '`' : '\''}${v as string}${(v as string).includes('\n') ? '`' : '\''}`}`;
                            })
                            .join(',\n  ')
                    }\n});\n`;
                }
                break;
            case Types.EVENTS:
                for (const ev of el.events!) {
                    js += `events.push({\n  ${Object.keys(ev).map(k => `${k}: '${escape(ev[k as keyof Event]!)}'`).join('\n  ')}\n});`;
                }
            case Types.CASE_SENSITIVE:
                js += `caseSensitive = ${!!el.bool!};\n`;
                break;
            case Types.BOTCEPTION:
                js += `botception = ${!!el.bool!};\n`;
                break;
            case Types.NO_DM:
                js += `noDM = ${!!el.bool!};\n`;
                break;
            case Types.PREFIX:
                js += `prefix = '${escape(el.prefix!)}';\n`;
                break;
        }
    }
    js += `for (const { name, run } of events) {
  client.on(name, (arg1, arg2) => {
    eval(run);
  });
}`;
    return js;
};

export { fromJSON };