import {Component, OnInit} from "@angular/core";
import {NavParams} from "ionic-angular";
import {IContentBlock, IPage} from "../../redux/models/app-data";
import {IAppState} from "../../redux/index-redux";
import {NgRedux} from "ng2-redux";

/*
 The content of this page is composed of content blocks defined in the app.json
 */
@Component({
  selector: 'dynamic-page',
  templateUrl: 'dynamic-page.html'
})
export class DynamicPage implements OnInit {
  page: IPage;
  showSideMenuButton = false;
  feedContentBlock = null;

  constructor(public navParams: NavParams, private ngRedux: NgRedux<IAppState>) {
    this.page = this.navParams.data;
    this.showSideMenuButton = this.page.showAsTab || !this.ngRedux.getState().hasTabs;
  }

  ngOnInit(): void {
    // Check if we have a 'Feed' content block and if it has a 'nextUrl' to load more data
    this.feedContentBlock = this.page.contentBlocks.find(
      (block: IContentBlock) => block.component === 'Feed' && block.data && block.data.nextUrl)
  }

  pageCssClasses() {
    return this.page && this.page.cssClasses || '';
  }

  blockCssClasses(contentBlock: IContentBlock) {
    return contentBlock && contentBlock.cssClasses || '';
  }
}
