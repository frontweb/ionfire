import {Component, AfterViewInit, ViewChild, ComponentFactoryResolver, Input} from "@angular/core";
import {ContentBlockHostDirective} from "./directives/content-block-host-directive";
import {IContentBlock} from "../../redux/models/app-data";
import {HtmlBlock} from "./components/html-block/html-block";
import {ContentBlockParams} from "./content-block-params";
import {Feed} from "./components/feed/feed";
import {Albums} from "./components/albums/albums";
import {SliderBlock} from "./components/slider-block/slider-block";

/*
  Generated class for the ContentBlock component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'content-block',
  templateUrl: 'content-block.html'
})
export class ContentBlock implements AfterViewInit {
  @ViewChild(ContentBlockHostDirective) contentBlockHost: ContentBlockHostDirective;

  @Input() params: IContentBlock;

  componentRegistry = {
    'HtmlBlock': HtmlBlock,
    'Feed': Feed,
    'Albums': Albums,
    'SliderBlock': SliderBlock
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    let component = this.componentRegistry[this.params.component];

    if (component) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

      let viewContainerRef = this.contentBlockHost.viewContainerRef;
      viewContainerRef.clear();

      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<ContentBlockParams>componentRef.instance).data = this.params.data;
    }
    else {
      console.warn(`Unknown component: ${this.params.component}`);
    }
  }

}
