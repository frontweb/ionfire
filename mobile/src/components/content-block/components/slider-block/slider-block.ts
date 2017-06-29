import {Component, Input} from '@angular/core';
import {ContentBlockParams} from "../../content-block-params";

export interface SliderBlockData {
  slides: string[];
}

/*
  Display a slider with photos
*/
@Component({
  selector: 'slider-block',
  templateUrl: 'slider-block.html'
})
export class SliderBlock implements ContentBlockParams {
  @Input() data: SliderBlockData;

  constructor() {
  }

}
