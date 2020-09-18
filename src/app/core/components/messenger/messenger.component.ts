import { Component, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import {Profile} from '../../model';


class Messege {
    date: string;
    message: string;
    admin: boolean;
}
@Component({
    selector: 'app-messenger',
    templateUrl: 'messenger.component.html',
    styleUrls: ['messenger.component.scss'],
    providers: [],
})

export class MessengerComponent implements OnChanges {
  // tslint:disable-next-line:no-output-on-prefix
    @Output() onAdded = new EventEmitter();
    @Input() whoiswho: string;
    @Input() userMessages: string;
    @Input() user: Profile;

    messages: Messege[] = [];
    userName = '';
    newMessage = '';
    hideMesenger = false;


  // tslint:disable-next-line:typedef
    ngOnChanges() {
        if (this.userMessages) {
            this.parseToArray();
        }
    }

    parseToArray = () => {
        this.messages = [];
        this.userName = `${this.user.firstName} ${this.user.lastName}`;

        if (this.userMessages) {
          // tslint:disable-next-line:variable-name
            const _messArray = this.userMessages.split('.~~.');
            _messArray.forEach(a => {
                const sp = a.split('.~.');
                if (sp[2]) {
                    this.messages.push({ message: sp[1], date: sp[2], admin: sp[0] === 'ADMIN' });
                }
            });
            this.scrrollDown();
        }
    }

    scrrollDown = () => {
        const a = setInterval(() => {
            const elem = document.getElementById('msgs');
            if (elem) {
                elem.scrollTop = elem.scrollHeight;
                clearInterval(a);
            }
        }, 500);
    }


    addMessage = () => {
        this.newMessage = `${this.whoiswho}.~.${this.newMessage}.~.${this.formatedDate(new Date())}.~~.`;
        this.onAdded.emit(this.newMessage);
        this.newMessage = '';
    }

    formatedDate = (inDate: Date = null): string | Date => {
        if (inDate) {
            inDate = new Date(inDate);
            return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
        } else {
            return new Date();
        }
    }


}
