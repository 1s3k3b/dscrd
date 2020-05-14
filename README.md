# About

DSCRD is a language for making low level Discord bots with [very easy syntax](#syntax).
It is written in [TypeScript](https://www.typescriptlang.org/) and it is compiled to [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), which can be ran with [Node.js](https://nodejs.org) after compilation.
DSCRD code can be compiled via the [CLI](#cli), or the [API](#api).
DSCRD files have the `.dscrd` extension.

While DSCRD in itself is enough to make a low level bot, knowing [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) allows you to do a lot more things.

# Syntax

DSCRD is indentation based. `commands` and `events` statements must have multiple, properly indented lines, and other statements must not.
Example code:
```
token AbCs0m3DeF.GhIs3cr3tJkL.MnOt0k3nPqR     # a super secret token
prefix dsc!                                   # the bot's prefix
commands                                      # the 'commands' statement
  command ping                                # the 'ping' command (mind the +1 indentation level)
    aliases pong pingtime                     # the 'ping' command's aliases, split by spaces (mind the +1 indentation level)
    run Pong!                                 # the 'ping' command's response, a single word in this case 
  command foo
    aliases bar
    run baz
  command randomtext
    aliases randtext
    run                                       # the 'randtext' command's source (JavaScript)
      reply(
          Array
              .from(
                  { length: 10 },
                  () =>
                      Array.from(
                          { length: 57 },
                          (_, i) => String.fromCharCode(i + 65)
                      )[~~(Math.random() * 57)]
              )
              .join('')
      );
```
`#`s singify comments. Everything after them on a line is ignored.

# Installation

- Download [Node.js](https://nodejs.org)
- Download or clone this repository
- Run `npm i` in the downloaded repository's folder
- You can now use the [API](#api) or the [CLI](#cli)

# API

Default export:
`compiler`<br>
Compiles DSCRD to JavaScript.<br>
Type: `function`<br>
Arguments:
  - `data`: `string | Element[]` - the string or parse tree to compile.

Returns: `string` - the compiled code.

Exports:
- `parser`<br>
  Generates a parse tree from a string.<br>
  Type: `function`<br>
  Arguments:
    - `string`: `string` - the string to parse.

  Returns: `Element[]` - the parse tree.

- `parseCommands`<br>
  Parses commands from an array of array of strings.<br>
  Type: `function`<br>
  Arguments:
    - `commands`: `string[][]` - the array of array of strings to parse.

  Returns: `Command[]` - the array of parsed events.

- `parseEvents`<br>
  Parses events from an array of array of strings.<br>
  Type: `function`<br>
  Arguments:
    - `events`: `string[][]` - the array of array of strings to parse.

  Returns: `Events[]` - the array of parsed events.

- `compiler`<br>
  Compiles DSCRD to JavaScript.<br>
  Type: `function`<br>
  Arguments:
    - `data`: `string | Element[]` - the string or parse tree to compile.

  Returns: `string` - the compiled code.

- `fromJSON`<br>
  Generates JavaScript from a JSON object.<br>
  Example:
  ```js
  fromJSON({
      token: 'AbCs0m3DeF.GhIs3cr3tJkL.MnOt0k3nPqR',
      caseSensitive: false,
      prefix: '!',
      commands: [{
          name: 'ping',
          aliases: 'pong',
          run: 'Ping!',
      }],
  });
  ```
  Type: `function`<br>
  Arguments:
    - `data`: `Program` - the object to generate JavaScript from.

  Returns: `string` - the generated code.

- `Builder`<br>
  The [builder](https://github.com/1s3k3b/dscrd/src/Builder.ts) class.

- [Types](https://github.com/1s3k3b/dscrd/src/types/index.ts)

# CLI

`dscrd build <to>.js`<br>
Builds a DSCRD app interactively

`dscrd <from>.dscrd <to>.js`<br>
Compiles a DSCRD file to a JS file

`dscrd <from>.json <to>.js`<br>
Compiles a JSON fine to a DSCRD file