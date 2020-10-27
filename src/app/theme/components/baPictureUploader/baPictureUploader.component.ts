import { Component, ViewChild, EventEmitter, Input, Renderer2, Output, ElementRef } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, NgFileSelectDirective } from 'ngx-uploader';
import { HttpClient } from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-ba-picture-uploader',
    styleUrls: ['./BaPictureUploader.component.scss'],
    templateUrl: './BaPictureUploader.component.html',
})
export class BaPictureUploaderComponent {

    @Input() defaultPicture = 'assets/img/theme/no-photo.png';
    @Input() objType: string;
    @Input() photoAvailable: string;

    picture = '';
    isUpdated = false;
    _objId: number;

    // @ts-ignore
  get objId(): any {
        return this._objId;
    }

    // @ts-ignore
  @Input() set objId(id: number): any {
        this._objId = id;
        if (id && id > 0 && this.photoAvailable) {
            if (!this.picture) {
            this.picture = `api/${this.objType}/${id}/assets/extag:ava/preview`;
            }
        } else {
            this.picture = '';
        }
    }

    @Output() onPreview = new EventEmitter<any>();
    @Output() onRemove = new EventEmitter<any>();

    @ViewChild('fileUpload') _fileUpload: ElementRef;

    uploadInProgress: boolean;
    previewImg = '';

    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[] = [];
    uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
    humanizeBytes = humanizeBytes;
    dragOver: boolean;

    constructor(private renderer: Renderer2, private http: HttpClient) {
        this.options = { concurrency: 1, allowedContentTypes: ['image/png', 'image/jpeg', 'image/gif'] };
    }

    onUploadOutput(output: UploadOutput): void {
        if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
            this.files.push(output.file);
            if (output.file) {
                        this._changePicture(output.file.nativeFile);
                        this.onPreview.emit(output.file.nativeFile);
            }
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'done') {
        }
    }

    startUpload(id?: number): Promise<any> {
        if (!this._objId && !id || this.files.length < 1) {
            return Promise.resolve(null);
        }

        const formData = new FormData();
        formData.append('files', this.files[this.files.length - 1].nativeFile);

        return this.http.post(`api/${this.objType}/${id ? id : this._objId}/assets?extag=ava&isPublic=true`, formData)
            .toPromise();
    }

    startRemove(): Promise<any> {
        if (!this._objId) {
            return Promise.resolve(null);
        }
        const headers = {'Content-Type': 'application/json'};
        const httpOptions = {
            headers: { 'Content-Type': 'application/json' },
            body: ['extag:ava'],
        };
        return this.http.delete(`api/${this.objType}/${this._objId}/assets`, httpOptions)
            .toPromise();
    }
    invokeElementMethod(eleRef: ElementRef, method: string): void {
      if (isPlatformBrowser(this._fileUpload)) {
        eleRef.nativeElement[method]();
      }
    }

    bringFileSelector(): boolean {
        this.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        document.getElementById('fileUpload').click();
        return false;
    }

    removePicture(): boolean {
        this.picture = '';
        this.isUpdated = true;
        this.onRemove.emit();
        return false;
    }

    _changePicture(file: File): void {
        const reader = new FileReader();
        reader.addEventListener('load', (event: Event) => {
            this.picture = (event.target as any).result;
        }, false);
        reader.readAsDataURL(file);
    }
}
