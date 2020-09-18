import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({ 
    // tslint:disable-next-line:directive-selector
    selector: '[scroll-spy]',
})

export class ScrollSpyDirective {
   
   
        @Output() onPageEnd = new EventEmitter();
       
        @HostListener('window:scroll', [])
       
        onWindowScroll() {
         
            const status = 'not reached';
            const windowHeight = 'innerHeight' in window ? window.innerHeight
                : document.documentElement.offsetHeight;
            const body = document.body, html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight,
                body.offsetHeight, html.clientHeight,
                html.scrollHeight, html.offsetHeight);
            const windowBottom = windowHeight + window.pageYOffset;
           
            if (windowBottom >= docHeight - 50) {
             
                this.onPageEnd.emit();

            }
        }
       
      }
