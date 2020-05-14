import { SyntaxError } from '../errors/';

export default (a: string[], i: number) => {
    let amount = 0;
    let level = 0;
    a
        .filter((_, _i) => _i > i)
        .every(e => {
            if (!level) {
                if (!/^\s/.test(e)) throw new SyntaxError('EMPTY');
                level = e.match(/^\s+/)![0].length;
                return ++amount;
            }
            if (!new RegExp(`^${'\\s'.repeat(level)}`).test(e)) return false;
            return ++amount;
        });
    return { amount, level };
};