import {Directive, ElementRef, Renderer, Input, HostListener} from '@angular/core';

@Directive({
  selector: '[onFocus]',
})

export class OnFocusDirective {
  private el: ElementRef;
  constructor(private _el: ElementRef, public renderer: Renderer) {
    this.el = this._el;
  }

  @HostListener('focus', ['$event']) onFocus(e) {
    this.renderer.setElementClass(this._el.nativeElement.parentNode, 'js-is-focused', true);
    return;
  }
  @HostListener('blur', ['$event']) onBlur(e) {
    if (this._el.nativeElement.value === '') {
      this.renderer.setElementClass(this._el.nativeElement.parentNode, 'js-is-focused', false);
    }
    return;
  }
}
