// import { Component } from '@angular/core';
//
// class ButtonsName {
//     ok: string;
//     cancel: string;
// }
//
// @Component({
//     selector: 'app-confirm',
//     templateUrl: './confirm.component.html',
//     styleUrls: ['confirm.component.scss'],
// })
//
//
// export class ConfirmComponent {
//
//     private promise: Promise<boolean>;
//     private resolve: (value?: boolean) => void;
//     private reject: (reason?: any) => void;
//
//     public message = '';
//     type = '';
//
//     buttonsName: ButtonsName = {
//         ok: 'OK',
//         cancel: 'CANCEL',
//     };
//
//     close(): any {
//         this.resolve(false);
//         this.hide();
//     }
//
//
//     onOk(): any {
//         this.resolve(true);
//         this.hide();
//     }
//
//
//     private hide(): any {
//         this.message = '';
//         this.type = '';
//     }
//
//     show = (type: string, message: string, buttonsName: ButtonsName = this.buttonsName): Promise<boolean> => {
//         if (buttonsName) {
//             this.buttonsName = buttonsName;
//         }
//         this.promise = new Promise<boolean>((resolve, reject) => {
//             this.resolve = resolve;
//             this.reject = reject;
//         });
//         this.message = message;
//         this.type = type;
//         return this.promise;
//     }
//
// }
