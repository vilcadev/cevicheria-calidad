import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor() { }

  private regex: RegExp = new RegExp(/^[0-9]*$/);

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (!this.regex.test(event.key)) {
      event.preventDefault();
    }
  }

}
