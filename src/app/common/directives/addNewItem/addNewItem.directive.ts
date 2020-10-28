import { Directive, Input, Output, EventEmitter, Renderer2, ElementRef, HostListener } from '@angular/core';


@Directive({
    selector: '[addNewItem]',

})

export class AddNewItemDirective {
    @Input() ref: string;
    @Output() onclick = new EventEmitter();

    private parent: any;
    private divElement: any;

    constructor(private _renderer: Renderer2, private _el: ElementRef) {
    }

    @HostListener('focus') onFocus(): any {
        this.renderLink();
    }

    @HostListener('focusout') onFocusOut(): any {
        this.removeItem(this.parent, this.divElement );
    }

    private renderLink() {
        this.parent = this._el.nativeElement.parentNode;
        this.divElement = this._renderer.createElement('div');
        const aElement = this._renderer.createElement('a');
        const iElement = this._renderer.createElement('i');
        const text = this._renderer.createText('Add new');

        this._renderer.appendChild(aElement, text);
        this._renderer.setAttribute(aElement, 'href', '#/' + `${this.ref}`);
        this._renderer.appendChild(this.divElement, aElement);
        this._renderer.addClass(this.divElement, 'addNewItem');
        this._renderer.addClass(this.divElement, 'forInputAddItem');
        this._renderer.addClass(iElement, 'fa-plus-square');
        this._renderer.addClass(iElement, 'fa');
        this._renderer.appendChild(aElement, iElement);

        this._renderer.insertBefore(this.parent, this.divElement, this._el.nativeElement);
        this._renderer.listen(aElement, 'click', (event) => this.addItem());
    }

    addItem(): void {
        this.onclick.emit();
    }

    removeItem(parent, div): void {
        setTimeout(() => this._renderer.removeChild(parent, div), 1000);
    }
}
