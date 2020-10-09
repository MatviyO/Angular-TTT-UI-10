import { IBaseConfig, INotificationService } from '../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../services';
import { Directive} from '@angular/core';

@Directive()

export class ComponentBaseDirective {

  protected notificationSvc: INotificationService;
  protected componentTitle: string;
  showLoadData = false;

  constructor(config: IBaseConfig) {
    this.notificationSvc = config.injector.get(NotificationService);
    this.componentTitle = config.componentTitle;
  }

  onHttpError(exception: HttpErrorResponse): void {
    this.showLoadData = false;
    const type = `${this.componentTitle} details`;
    if (exception) {
      if (exception.status === 404) {
        this.notificationSvc.error(type, 'No records found with specified ID');
        return;
      }
      if (exception.status === 401) {
        return;
      }
      if (exception.error && exception.error.ErrorCode) {
        let errorMessages = '';
        switch (exception.error.ErrorCode) {
          case 101: {
            errorMessages = `${exception.error.Message} Please refresh the page and retry.`;
            break;
          }
          case 102:
          case 104: {
            errorMessages = exception.error.Message;
            errorMessages += ` Field(s): ${exception.error.Fields.join(', ')}.`;
            break;
          }
          case 103: {
            errorMessages = 'One or more fields exceed allowed length.';
            break;
          }
          case 201: {
            errorMessages = exception.error.Message;
            for (const property in exception.error) {
              if (property !== 'ErrorCode' && property !== 'Message') {
                if (exception.error.hasOwnProperty(property)) {
                  const msg = `${property}: ${exception.error[property].join('; ')}`;
                  this.notificationSvc.error(type, msg);
                }
              }
            }
            break;
          }
          // 1, 105, 202
          default: {
            errorMessages = exception.error.Message;
            break;
          }
        }
        if (errorMessages) {
          this.notificationSvc.error(type, errorMessages);
        }
        return;
      } else if (exception && exception.error && exception.error.errors) {
        let errorMessages = '';
        for (const key in exception.error.errors) {
          if (exception.error.errors.hasOwnProperty(key)) {
            errorMessages = `${key}:  ${exception.error.errors[key].join(' ')}`;
            this.notificationSvc.error(type, errorMessages);
          }
        }
        return;
      } else {
        // tslint:disable-next-line:forin
        for (const property in exception.error) {
          if (property === '') {
            this.notificationSvc.error(type, 'Bad request: invalid data has been submitted.');
            continue;
          }
          if (exception.error.hasOwnProperty(property)) {
            this.notificationSvc.error(type, exception.error[property].join(' '));
          }
        }
      }
    }
    this.notificationSvc.error(type, 'Failed to process request ');
  }
}
