import {Component, ViewChild, EventEmitter, Renderer2, ElementRef, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UploadInput, UploadFile} from 'ngx-uploader';
import {UrlProvider} from '../../utils';
import {NotificationService} from '../../services/notification.service';
// import { ConfirmComponent } from '../confirm';
import {isPlatformBrowser} from '@angular/common';
import {ConfirmComponent} from '../confirm';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})

export class FileUploaderComponent implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  @ViewChild('fileUpload') _fileUpload: ElementRef;
  @Input() tag: string;
  uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
  files: UploadFile[] = [];
  // tslint:disable-next-line:variable-name
  _files: any = [];
  id: number;
  getUrl: string;
  getObjId: number;
  dragOver: boolean;
  addFiles: boolean;
  loading: boolean;
  hide = true;
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-app-name' : 'ttt' });

  @Input() objId: number;
  @Input() url: string;

  constructor(
    private renderer: Renderer2,
    private http: HttpClient,
    protected urlProvider: UrlProvider,
    private notificationSvc: NotificationService,
  ) {
  }
  ngOnInit(): any {
    this.getObjId = this.objId;
    this.getUrl = this.url;
    this.getAssets();
  }

  getAssets(): any {
    if (this.getObjId > 0 ) {
      this.loading = true;
      this.http.get(`${this.getUrl}/${this.getObjId}/assets`)
        .toPromise()
        .then(res => {
          this._files = Object.keys(res).map((index) => {
            const file = res[index];
            return file;
          }).filter(el => !el.exTag || el.exTag !== 'ava');
        })
        .catch(err => this.onHttpError(err));
    }
    this.loading = false;
  }

  onUploadOutput(output): void {
    if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.files.push(output.file);
      this.hide = false;
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'done') {
      this.onPhotoUploaded(output.file);
    }
  }


  startUpload(): void {
    this.loading = true;
    const formData = new FormData();
    this.files.forEach(file => {
      formData.append('files', file.nativeFile);
    });
    this.http.post(`${this.getUrl}/${this.getObjId}/assets${this.tag ? '?tag=' + this.tag : ''}`, formData)
      .toPromise()
      .then((res: any[]) => {
        for (const item of res) {
          this._files.push(item);
          this.files = [];
          this.addFiles = false;
          this.loading = false;
        }
      })
      .catch(err => this.onHttpError(err));
  }

  onPhotoUploaded(response: any): void {
    response.id = response.response;
    this._files.push(response);
    this.files = [];
    this.addFiles = false;
  }

  invokeElementMethod(eleRef: ElementRef, method: string): any {
    if (isPlatformBrowser(this._fileUpload)) {
      eleRef.nativeElement[method]();
    }
  }

  bringFileSelector(): any {
    this.addFiles = true;
    this.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    document.getElementById('fileUpload').click();
  }

  cancelUpload(id: string): void {
    const index = this.files.findIndex(x => x.id === id);
    this.files.splice(index, 1);
  }

  removeFile(id: string, name: string): any {
    this.confirm.show(
        'confirm',
        `Are you sure you would like to delete ${name}?`,
    )
        .then(answer => {
            if (answer) {
    this.loading = true;
    const httpOptions = {
      headers: this.headers,
      body: [id],
    };
    this.http.delete(`${this.getUrl}/${this.getObjId}/assets`, httpOptions)
      .toPromise()
      .then(res => {
        const index = this._files.findIndex(x => x.id === id);
        this._files.splice(index, 1);
        this.loading = false;
      })
      .catch(err => this.onHttpError(err));
        }
    });
  }

  getIconforType(fileName: string): string {
    let className: string;
    const arr = fileName.split('.');
    fileName = arr[arr.length - 1];

    switch (fileName) {
      case 'jpeg':
        className = 'fa fa-file-image-o';
        break;
      case 'jpg':
        className = 'fa fa-file-image-o';
        break;
      case 'png':
        className = 'fa fa-file-image-o';
        break;
      case 'bmp':
        className = 'fa fa-file-image-o';
        break;
      case 'txt':
        className = 'fa fa-file-text-o';
        break;
      case 'docx':
        className = 'fa fa-file-word-o';
        break;
      case 'xlsx':
        className = 'fa fa-file-excel-o';
        break;
      default:
        className = 'fa fa-file-text-o';
    }
    return className;
  }

  onHttpError(exception: any): void {
    this.loading = false;
    const type = 'Uploading files';
    if (exception) {
      if (exception.status === 404) {
        this.notificationSvc.error(type, 'No records found with specified ID');
        return;
      }
      if (exception.status === 401) {
        return;
      }
      if (exception.error) {
        this.notificationSvc.error(type, exception.error);
        return;
      }
    }
    this.notificationSvc.error(type, 'Failed to process request ');
  }

}
