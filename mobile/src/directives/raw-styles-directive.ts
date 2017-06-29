import {Directive, ElementRef, Input, OnInit} from "@angular/core";

/**
 * Set raw styles in a style tag
 */
@Directive({
  selector: '[raw-styles]'
})
export class RawStylesDirective implements OnInit {
  @Input('raw-styles') styles: string;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    if (this.styles) {
      this.elementRef.nativeElement.innerHTML = `<style>${this.styles}</style>`;
      this.elementRef.nativeElement.style.height = 0;
    }
  }
}
