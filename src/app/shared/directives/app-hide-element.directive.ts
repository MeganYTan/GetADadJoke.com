import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Directive that adds Bootstrap classes 'd-none' and 'd-lg-inline' based on appHideElement input.
 * These classes hide the element on screen sizes medium and smaller.
 * 
 * @Directive HideElementDirective
 * @selector [appHideElement]
 */
@Directive({
    selector: '[appHideElement]'
})
export class HideElementDirective implements OnInit{
    @Input() appHideElement: boolean = false;
    constructor(
        private eleRef: ElementRef,
        private renderer: Renderer2
    ) {
        
    }
    ngOnInit(): void {
        // add d-none d-lg-inline classes if appHideElement is true
        if (this.appHideElement) {
            this.renderer.addClass(this.eleRef.nativeElement, 'd-none');
            this.renderer.addClass(this.eleRef.nativeElement, 'd-lg-inline');
        }
    }
}