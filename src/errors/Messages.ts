export default {
    'EMPTY': () => 'Commands or events expected.',
    'EMPTY_EVENTS': () => 'Events expected.',
    'UNKNOWN_STATEMENT': (statement: string) => 'Unknown statement ' + statement + '.',
} as { [key: string]: (...args: string[]) => string };