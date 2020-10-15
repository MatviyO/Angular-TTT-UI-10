import { Component, Input } from '@angular/core';

@Component({
    selector: 'load-data',
    template: `
    <div [ngClass]="{'fullScreen' : fullscreen}">
        <div class="load">
            <div class="spinner"></div>
        </div>
    </div>
    `,
    styleUrls: ['progressLoadData.component.scss'],
})

export class ProgressLoadDataComponent {
    @Input() fullscreen;
}
