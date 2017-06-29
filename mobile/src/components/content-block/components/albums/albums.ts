import {Component, Input} from "@angular/core";
import {ContentBlockParams} from "../../content-block-params";
import {DynamicPage} from "../../../../pages/dynamic-page/dynamic-page";
import {NavController} from "ionic-angular";
import {IPage} from "../../../../redux/models/app-data";

export interface IAlbumItem {
  name?: string;
  photos?: string[];
}

export interface IAlbumsData {
  items: IAlbumItem[];
}

/*
  Display a list of cards with full images
*/
@Component({
  selector: 'albums',
  templateUrl: 'albums.html'
})
export class Albums implements ContentBlockParams {
  @Input() data: IAlbumsData;

  constructor(private nav: NavController) {
  }

  onItemClick(item: IAlbumItem) {
    let page: IPage = {
      title: item.name,
      contentBlocks: [
        {
          component: 'SliderBlock',
          data: {
            slides: item.photos
          }
        }
      ]
    };
    this.nav.push(DynamicPage, page);
  }
}
