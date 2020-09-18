import {BaseEntity} from '../../../common/entities';

export class ProfileStats extends BaseEntity {
    byBranch: IByBranch[];
    byBase: IByBranch[];
}

export interface IByBranch {
    name: string;
    count: number;
}
