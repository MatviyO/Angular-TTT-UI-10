import { BaseEntity } from '../entities';

export class Comparer<T extends BaseEntity>{

    isEqual(x: T, y: T): boolean {
        let res = true;
        Object.getOwnPropertyNames(x).forEach(prop => {
            if (!(x[prop] instanceof BaseEntity)) {
                if (x[prop] !== y[prop]) {
                    res = false;
                    return false;
                }
            }
        });

        return res;
    }
}
