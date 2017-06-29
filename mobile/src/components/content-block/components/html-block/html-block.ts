import {Component, Input} from '@angular/core';
import {ContentBlockParams} from "../../content-block-params";
import {IonicModule} from "ionic-angular";

export interface IHtmlBlockData {
  componentTemplate: string;
}

/*
  Renders custom Angular2 template
*/
@Component({
  selector: 'html-block',
  templateUrl: 'html-block.html'
})
export class HtmlBlock implements ContentBlockParams {
  @Input() data: IHtmlBlockData;

  extraModules = [IonicModule];

  constructor() {
  }

}
