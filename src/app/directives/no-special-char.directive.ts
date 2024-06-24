import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoSpecialChar]'
})
export class NoSpecialCharDirective {
    private regex: RegExp = new RegExp(/^[a-zA-Z0-9 ]*$/);

  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (!this.regex.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    this.trimSpaces();
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    this.preventLeadingSpace();
  }

  private trimSpaces() {
    const input = this.el.nativeElement as HTMLInputElement;
    input.value = input.value.trim();
  }
  private preventLeadingSpace() {
    const input = this.el.nativeElement as HTMLInputElement;
    if (/^\s/.test(input.value)) {
      input.value = input.value.replace(/^\s+/, '');
    }
  }

}
