import { Injector } from '@angular/core';

import { IDataService, ITriggerService, ITriggerHelper } from './';
import { BaseEntity } from '../entities';

export interface IBaseConfig {
    injector: Injector;
    componentTitle: string;
    includes?: string;
    selectJSONPath?: string;
}

export interface IComponentConfig<T extends BaseEntity> extends IBaseConfig {
    dataSvc: IDataService<T>;
}

export interface IListWithTriggersConfig<T extends BaseEntity> extends IComponentConfig<T> {
    triggersSvc: ITriggerService;
    triggerType: string;
}

export interface IEditorConfig<T extends BaseEntity> extends IComponentConfig<T> {
    cls: new () => T;
}

export interface IEditorStatefulConfig<T extends BaseEntity> extends IEditorConfig<T> {
    navigationTitle: string;
    navigationUrlPrefix: string;
}

export interface IEditorWithTriggersConfig<T extends BaseEntity> extends IEditorConfig<T> {
    triggerCategory: string;
    triggersSvc: ITriggerService;
    triggerHelper: ITriggerHelper;
}

export interface IEditorStatefulWithTriggersConfig<T extends BaseEntity> extends IEditorStatefulConfig<T> {
    triggerCategory: string;
    triggersSvc: ITriggerService;
    triggerHelper: ITriggerHelper;
}
