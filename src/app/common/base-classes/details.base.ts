import {OnInit, Injector, Directive, Injectable} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { BaseEntity } from '../entities';
import {
  IEditor, IEditorStateful, IEditorWithTriggers,
  IEditorConfig, IEditorStatefulConfig, IEditorWithTriggersConfig, IEditorStatefulWithTriggersConfig,
  IDataService,
  IInstanceCreator,
  IDataStorage,
  INavigationHelper,
  ITriggerService,
  ITriggerHelper,
  IEditorState, IEditorStateExt,
} from '../interfaces';
import { MemoryDataStorage, NavigationHelper, applyMixins } from '../utils';

import { Trigger } from '../../core';
import {ComponentBase} from './componentBase';

@Directive()
export class DetailsBaseClassDirective<T extends BaseEntity> extends ComponentBase implements OnInit, IInstanceCreator<T>, IEditor<T> {

  protected dataSvc: IDataService<T>;
  protected injector: Injector;
  protected cls: new() => T;
  protected storage: IDataStorage;
  protected route: ActivatedRoute;
  protected router: Router;
  protected queryParams: Params;
  protected loadlisteners: ((x: T) => void)[] = [];
  protected savelisteners: ((x: T) => void)[] = [];
  protected includes: string;
  entity: T;

  constructor(
    config: IEditorConfig<T>,
  ) {
    super(config);
    this.dataSvc = config.dataSvc;
    this.cls = config.cls;

    this.storage = config.injector.get(MemoryDataStorage);
    this.route = config.injector.get(ActivatedRoute);
    this.router = config.injector.get(Router);
    this.includes = config.includes ? config.includes : null;
  }

  ngOnInit(): void {
    this.entity = this.createInstance();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.queryParams = params;
          this.getData(+params['id'], params['selector']);
        },
      );
  }

  createInstance(): T {
    return new this.cls();
  }

  getData(id: number, selector: string = ''): Promise<T> {
    this.showLoadData = true;
    if (!isNaN(id) && id > 0) {
      const p = this.dataSvc.select(id, selector, this.includes);
      p.then(data => {
        this.entity = data;
        this.showLoadData = false;
        this.propagateEvent(this.loadlisteners, this.entity);
        return this.entity;
      })
        .catch((error: HttpErrorResponse) => this.onHttpError(error));
      return p;
    } else {
      this.entity = this.createInstance();
      this.showLoadData = false;
      this.propagateEvent(this.loadlisteners, this.entity);
      return Promise.resolve(this.entity);
    }
  }

  save(): Promise<T> {
    this.showLoadData = true;
    if (this.entity.id > 0) {
      const p = this.dataSvc.update(this.entity);
      p.then(obj => {
        this.entity = obj;
        this.showLoadData = false;
        this.propagateEvent(this.savelisteners, this.entity);
        return obj;
      }).catch((error: HttpErrorResponse) => this.onHttpError(error));
      return p;
    } else {
      const p = this.dataSvc.create(this.entity);
      p.then(obj => {
        this.entity = obj;
        this.showLoadData = false;
        this.propagateEvent(this.savelisteners, this.entity);
        return obj;
      }).catch((error: HttpErrorResponse) => this.onHttpError(error));
      return p;
    }
  }

  onDataLoaded(callback: (x: T) => void): void {
    this.loadlisteners.push(callback);
  }

  onDataSaved(callback: (x: T) => void): void {
    this.savelisteners.push(callback);
  }

  protected propagateEvent(listeners: ((x: T) => void)[], data: any): void {
    listeners.forEach(cb => cb(data));
  }
}
@Directive()

export class DetailsStatefulDirective<T extends BaseEntity>
  extends DetailsBaseClassDirective<T> implements OnInit, IEditor<T>, IEditorStateful<T> {

  protected storage: IDataStorage;
  protected navigation: INavigationHelper;
  protected navigationTitle: string;
  protected navigationUrlPrefix: string;
  protected state: IEditorState;

  constructor(
    config: IEditorStatefulConfig<T>,
  ) {
    super(config);

    this.navigationTitle = config.navigationTitle;
    this.navigationUrlPrefix = config.navigationUrlPrefix;

    this.storage = config.injector.get(MemoryDataStorage);
    this.navigation = config.injector.get(NavigationHelper);
  }

  ngOnInit(): void {

    this.entity = this.createInstance();
    this.route.params
      .subscribe(
        (params: any) => {
          this.queryParams = params;
          if (params['key']) {
            this.loadState(params['key']);
          } else {
            this.getData(params['id'], params['selector']);
          }
        },
      );
  }

  saveState(name: string, urlPrefix: string, data?: IEditorStateExt): void {
    const key = (+new Date()).toString();

    this.state = {
      entity: this.entity,
      query: this.queryParams,
      data,
    };


    this.storage.store(key, this.state);
    if (data && data.section) {
      this.navigation.addNavigation(name, `/${urlPrefix}/r/details/${key}/${data.section}`);
    } else {
      this.navigation.addNavigation(name, `/${urlPrefix}/r/details/${key}`);
    }
  }

  loadState(key: string): void {
    if (this.storage.exists(key)) {
      const state = this.storage.get(key);
      this.entity = state.entity;
      this.queryParams = state.query;
      this.state = state;
      this.propagateEvent(this.loadlisteners, this.entity);
      this.state.data = null;
    } else {
      this.router.navigateByUrl(this.navigationUrlPrefix);
    }
  }

  navigate = (data?: IEditorStateExt): void => {
    this.saveState(this.navigationTitle, this.navigationUrlPrefix, data);
  }
}

@Directive()

export class DetailsWithTriggers<T extends BaseEntity> extends DetailsBaseClassDirective<T> implements IEditor<T>, IEditorWithTriggers<T> {

  protected triggersSvc: ITriggerService;
  protected triggerHelper: ITriggerHelper;
  protected triggerCategory: string;
  protected loadtriggers: ((T) => void)[] = [];


  constructor(
    config: IEditorWithTriggersConfig<T>,
  ) {
    super(config);
    this.triggerCategory = config.triggerCategory;
    this.triggersSvc = config.triggersSvc;
    this.triggerHelper = config.triggerHelper;
    super.onDataLoaded((data) => this.getTriger(data, this.triggerCategory));
  }

  onTriggerLoaded(callback: (T) => void): void {
    this.loadtriggers.push(callback);
  }

  getTriger(entity: T, category: string = 'All'): void {
    if (entity && entity.id) {
      if (category === 'Application') {
        category = '6&cats=1';
        this.triggersSvc.queryByCategory(category, `applicationId==${entity.id}`)
          .subscribe(
            (data: Trigger[]) => {
              data.forEach(item => {
                let types = `Trigger: ${this.componentTitle}`;
                let trigStr = `${this.triggerHelper.getTriggerType(item.triggerType)} ${this.triggerHelper.getDays(item.value, item.isApproaching)}`;
                if (item.triggerType === 10) {
                  types = `Trigger: Hiller`;
                  trigStr = `${this.triggerHelper.getTriggerType(item.triggerType)}`;
                }

                this.notificationSvc.notify(item.severity, types, `Time to ${trigStr}`);
              });
              super.propagateEvent(this.loadtriggers, data);
            },
            err => {
              this.onHttpError(err);
              return;
            },
          );

      }
      this.triggersSvc.queryByCategory(category, `mainObjectId==${entity.id}`)
        .subscribe(
          (data: Trigger[]) => {
            data.forEach(item => {
              const trigStr = `${this.triggerHelper.getTriggerType(item.triggerType)} ${this.triggerHelper.getDays(item.value, item.isApproaching)}`;
              const types = `Trigger: ${this.componentTitle}`;
              this.notificationSvc.notify(item.severity, types, `${trigStr}`);
            });
            super.propagateEvent(this.loadtriggers, data);
          },
          err => this.onHttpError(err),
        );
    }
  }
}
@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DetailsStatefulDirectiveWithTriggers<T extends BaseEntity> extends DetailsStatefulDirective<T>
  implements IEditor<T>, IEditorStateful<T>, IEditorWithTriggers<T> {

  protected triggersSvc: ITriggerService;
  protected triggerHelper: ITriggerHelper;
  protected triggerCategory: string;
  protected loadtriggers: ((T) => void)[] = [];

  constructor(
    config: IEditorStatefulWithTriggersConfig<T>,
  ) {
    super(config);
    this.triggerCategory = config.triggerCategory;
    this.triggersSvc = config.triggersSvc;
    this.triggerHelper = config.triggerHelper;
    super.onDataLoaded((data) => this.getTriger(data, this.triggerCategory));
  }

  onTriggerLoaded: (callback: (T) => void) => void;

  getTriger: (entity: T, category: string) => void;

}

applyMixins(DetailsStatefulDirectiveWithTriggers, [DetailsWithTriggers]);
