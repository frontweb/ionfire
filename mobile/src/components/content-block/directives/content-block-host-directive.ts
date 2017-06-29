import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[content-block-host]'
})
export class ContentBlockHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
