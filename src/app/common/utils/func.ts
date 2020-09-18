export function genKey(args: string[]): string {

    
    function encode(s: string): string {
        const re = /\//gi;

        return s.replace('>', '')
            .replace('<', '')
            .replace('=', '')
            .replace('!', '')
            .replace('.', '')
            .replace(re, '_')
            .replace(' ', '');
    }

    let res = '';

    args.forEach(x => x = encode(x));
    res = args.join('_');

    return res;
}
