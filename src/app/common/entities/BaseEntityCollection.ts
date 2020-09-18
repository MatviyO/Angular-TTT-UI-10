import { BaseEntity } from '../entities';
import { IEntityCollection } from '../interfaces';

export class BaseEntityCollection<T extends BaseEntity> implements IEntityCollection<T> {
    data: T[];
    total: number;
}
