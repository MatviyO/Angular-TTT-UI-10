import {OnInit, AfterContentInit, Directive, Injectable} from '@angular/core';
import {
  IInstanceCreator, IList, ISortableList, IEditableList, IListWithTriggers,
  IDataStorage, IDataService, ITriggerService,
  IComponentConfig, IListWithTriggersConfig, IEditorConfig, INavigationHelper,
} from '../interfaces';
import { MemoryDataStorage, applyMixins, NavigationHelper } from '../utils';
import { BaseEntity } from '../entities';
import {ComponentBase} from './componentBase';


@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseList<T extends BaseEntity> extends ComponentBase implements OnInit, IList<T> {

  protected dataSvc: IDataService<T>;
  protected loadlisteners: ((data: T, response: T) => void)[] = [];

  skip: number = 0;
  take: number = 25;
  total: number = 0;
  totalLoaded: number = 0;
  entities: T[] = [];
  includes: string;
  selectJSONPath: string;

  constructor(
    config: IComponentConfig<T>,
  ) {
    super(config);
    this.dataSvc = config.dataSvc;
    this.includes = config.includes ? config.includes : null;
    this.selectJSONPath = config.selectJSONPath ? config.selectJSONPath : null;
  }

  onDataLoaded(callback: (data: T, response: T) => void): void {
    this.loadlisteners.push(callback);
  }
  protected propagateEvent(listeners: ((data: T, response: T) => void)[], data: any, res: any = null): void {
    listeners.forEach(cb => cb(data, res));
  }

  ngOnInit(): void {


    this.entities = new Array<T>();
    this.getData();
  }

  loadMore(): void {
    if (this.showLoadData) {
      return;
    }
    this.skip += this.take;
    this.getData();
  }

  getData(args: any[] = null): void {
    this.getDataInternal('', '', this.take, this.skip, args);
  }

  protected getDataInternal(filter: string, order: string, take: number, skip: number, args: any[]): void {
    if (this.totalLoaded < this.take && this.skip > 0) {
      this.showLoadData = false;
      return;
    }
    this.showLoadData = true;
    if (!order && (skip > 0 || take > 0)) {
      order = 'id desc';
    }
    this.dataSvc.query(filter, order, take, skip, args, this.includes, this.selectJSONPath)
      .then(response => {
        this.totalLoaded = response.length;
        this.entities = this.entities.concat(response);
        this.showLoadData = false;
        this.propagateEvent(this.loadlisteners, this.entities, response);

      }).catch((error: any) => {
      this.showLoadData = false;
      this.onHttpError(error);
    });
  }
}
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseSortableList<T extends BaseEntity> extends BaseList<T> implements IList<T>, ISortableList<T>, OnInit {

  private filterStorageKey: string = `${this.componentTitle.replace(' ', '')}_filter`;
  private sortStorageKey: string = `${this.componentTitle.replace(' ', '')}_sort`;

  protected storage: IDataStorage;


  showfilter: boolean = false;

  filter: any = {};
  sort: any = { direction: true, column: '' };

  abstract getFilterFormatted(): string;

  constructor(
    config: IComponentConfig<T>,
  ) {
    super(config);
    this.storage = config.injector.get(MemoryDataStorage);
    // this.navigation = config.injector.get(NavigationHelper);
  }

  ngOnInit(): void {
    if (Object.keys(this.filter).length === 0) {
      if (this.storage.exists(this.filterStorageKey)) {
        this.filter = this.storage.get(this.filterStorageKey);
        if (Object.keys(this.filter).length > 0) {
          this.showfilter = true;
        }
      }
    }
    if (this.storage.exists(this.sortStorageKey)) {
      this.sort = this.storage.get(this.sortStorageKey);
    }
    super.ngOnInit();
  }

  onSearch(): void {
    this.skip = 0;
    this.entities = new Array<T>();
    this.getData();
  }

  onSort(column: string): void {
    if (this.sort.column === column) {
      this.sort.direction = !this.sort.direction;
    } else {
      this.sort = { column, direction: true };
    }
    this.entities = new Array<T>();

    this.skip = 0;
    this.getData();
  }

  getSortFormatted(): string {
    if (!this.sort.column) {
      return '';
    }
    return `${this.sort.column} ${this.sort.direction ? 'ascending' : 'descending'}`;

  }

  replaceSpecialCharacters(attribute: string): string {
    attribute = attribute.replace(/'/g, "''");
    attribute = attribute.replace(/"/g, '');
    attribute = attribute.replace(/%/g, '%25');
    attribute = attribute.replace(/\+/g, '%2B');
    attribute = attribute.replace(/\//g, '%2F');
    attribute = attribute.replace(/\?/g, '%3F');
    attribute = attribute.replace(/#/g, '%23');
    attribute = attribute.replace(/&/g, '%26');
    return attribute;
  }

  getData(args: any[] = null): void {
    this.storage.store(this.filterStorageKey, this.filter);
    this.storage.store(this.sortStorageKey, this.sort);

    super.getDataInternal(this.getFilterFormatted(), this.getSortFormatted(), this.take, this.skip, args);
  }
}
@Directive()

// tslint:disable-next-line:directive-class-suffix max-line-length
export abstract class BaseListWithTriggers<T extends BaseEntity> extends BaseList<T> implements IList<T>, IListWithTriggers<T>, OnInit, AfterContentInit {

  protected triggerSvc: ITriggerService;
  protected triggerType: string;
  triggers: any[] = [];

  constructor(
    config: IListWithTriggersConfig<T>,
  ) {
    super(config);
    this.triggerSvc = config.triggersSvc;
    this.triggerType = config.triggerType;
  }

  ngOnInit(): void {
    super.ngOnInit();
    // this.getTriggers(this.triggerType);
  }

  ngAfterContentInit(): void {
    this.getTriggers(this.triggerType);
  }

  getTriggers(triggersType: string): void {
    this.triggerSvc.queryByCategory(triggersType, '')
      .subscribe(
        res => this.triggers = res,
        err => this.onHttpError(err),
      );
  }

  addStatusColor(itemId: number, sub?: boolean): string {
    let color = 'white';
    let trig;
    if (sub) {
      trig = this.triggers.find(x => x.objectId === +itemId);
    } else {
      trig = this.triggers.find(x => x.mainObjectId === +itemId);
    }
    if (trig) {
      if (trig.severity === 1) {
        color = 'yellow';
      }
      if (trig.severity === 2) {
        color = 'red';
      }
    }
    return color;
  }

}

export abstract class BaseEditableList<T extends BaseEntity> extends BaseList<T> implements IList<T>, IEditableList<T>, IInstanceCreator<T> {

  protected cls: { new(): T };

  entity: T;
  _items: any[] = [];
  validation: boolean;
  protected navigation: INavigationHelper;


  protected saveListeners: ((T) => void)[] = [];

  constructor(
    config: IEditorConfig<T>,
  ) {
    super(config);
    this.cls = config.cls;
    this.entity = this.createInstance();
    this.navigation = config.injector.get(NavigationHelper);

  }

  onDataSaved(callback: (arg0: T) => void): void {
    this.saveListeners.push(callback);
  }

  createInstance(): T {
    return new this.cls();
  }

  edit(item: T): void {
    this._items.push(Object.assign({}, item));
  }

  cancelEdit(item: any, i: number): void {
    const index = this._items.findIndex(x => x.id === item.id);
    if (index >= 0) {
      this.entities[i] = this._items[index];
      this._items[index].editing = false;
      this._items.splice(index, 1);
    }
  }

  save(entity: T): Promise<T> {
    // this.validation = true;
    this.showLoadData = true;
    if (entity.id && entity.id > 0) {
      return this.dataSvc.update(entity)
        .then(obj => {
          this.showLoadData = false;
          const i = this.entities.findIndex(x => x.id === obj.id);
          if (i >= 0) {
            this.entities[i] = obj;
          }
          const index = this._items.findIndex(x => x.id === entity.id);
          if (index >= 0) {
            this._items.splice(index, 1);
          }
          super.propagateEvent(this.saveListeners, this.entity);
          return obj;
        }).catch((error: any) => {
          this.onHttpError(error);
          this.showLoadData = false;
          return null;
        });
    } else {
      return this.dataSvc.create(entity)
        .then(obj => {
          this.showLoadData = false;
          this.entities.push(obj);
          this.entity = this.createInstance();
          super.propagateEvent(this.saveListeners, this.entity);
          return obj;
        }).catch((error: any) => {
          this.onHttpError(error);
          this.showLoadData = false;
          return null;
        });
    }
  }

  delete(obj: T): Promise<void> {
    this.showLoadData = true;
    return this.dataSvc.delete(obj)
      .then(res => {
        const i = this.entities.findIndex(x => x.id === obj.id);
        // this.entities[i] = res;
        this.showLoadData = false;
        if (i >= 0) {
          this.entities.splice(i, 1);
        }
        return;
      }).catch((error: any) => {
        this.onHttpError(error);
        this.showLoadData = false;
        return null;
      });
  }

  onSave(item, form): void {
    event.returnValue = false;
    if (form.valid) {
      form._submitted = false;
      this.save(item);
      form.form.reset();
    } else {
      form._submitted = true;
      this.notificationSvc.warning('info', 'Please fill in required fields');
    }
  }
}

export abstract class BaseSortableListWithTriggers<T extends BaseEntity> extends BaseSortableList<T>
  implements IList<T>, ISortableList<T>, IListWithTriggers<T>, OnInit {

  protected triggerSvc: ITriggerService;
  protected triggerType: string;
  triggers: any[] = [];

  constructor(
    config: IListWithTriggersConfig<T>,
  ) {
    super(config);
    this.triggerType = config.triggerType;
    this.triggerSvc = config.triggersSvc;
  }

  // ngOnInit(): void {
  //    //super.ngOnInit();
  //    //this.getTriggers(this.triggerType);
  // }

  getTriggers: (triggersType: string) => void;

  addStatusColor: (itemId: number, sub?: boolean) => string;
}
@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BaseEditableSortableList<T extends BaseEntity> extends BaseEditableList<T>
  implements IList<T>, IEditableList<T>, ISortableList<T>, OnInit {

  private filterStorageKey: string = `${this.constructor.name}_filter`;
  private sortStorageKey: string = `${this.constructor.name}_sort`;

  protected storage: IDataStorage;

  showfilter: boolean = false;

  filter: any = {};
  sort: any = { direction: true, column: '' };

  abstract getFilterFormatted(): string;

  constructor(
    config: IEditorConfig<T>,
  ) {
    super(config);
    this.storage = config.injector.get(MemoryDataStorage);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  onSearch: () => void;
  onSort: (column: string) => void;

  getSortFormatted: () => string;
  getData(args: any[]): void { }

}

applyMixins(BaseEditableSortableList, [BaseSortableList]);
applyMixins(BaseSortableListWithTriggers, [BaseListWithTriggers]);

