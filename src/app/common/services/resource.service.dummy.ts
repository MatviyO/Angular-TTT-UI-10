import { BaseEntity } from '../entities';
import { IResourceService } from '../interfaces';

export class ResourceServiceDummy<T extends BaseEntity> implements IResourceService<T> {

     count(filter?: string): Promise<number> {
        const promise = new Promise<number>((resolve, reject) => {
            this.res = resolve;
            this.rej = reject;
        });

        setTimeout(() => this.resolve(this.dataSet), 1000);

        return promise;
    }
    private res: (value?: number) => void;
    private rej: (reason?: any) => void;
    private resolve: (value?: T[]) => void;
    private reject: (reason?: any) => void;

    constructor(private dataSet: T[]) { }

    query(filter: string = '', order: string = ''): Promise<T[]> {
        const promise = new Promise<T[]>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });

        setTimeout(() => this.resolve(this.dataSet), 1000);

        return promise;
    }
}
