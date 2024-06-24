import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimalNumbers]'
})
export class DecimalNumbersDirective {
    private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/);
  constructor(private el: ElementRef) { }


  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;

    if (!this.regex.test(value)) {
      input.value = value.slice(0, -1); // Remove last character if invalid
      event.preventDefault();
    }
  }


}
