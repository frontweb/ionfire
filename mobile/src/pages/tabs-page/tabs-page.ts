import {Component} from "@angular/core";
import {IAppState} from "../../redux/index-redux";
import {NgRedux} from "ng2-redux";
import {IPage} from "../../redux/models/app-data";
import {DynamicPage} from "../dynamic-page/dynamic-page";

@Component({
  selector: 'tabs-page',
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  tabs: any;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.tabs = this.ngRedux.getState().app.pages
      .filter((p: IPage) => p.showAsTab)
      .map((p: IPage) => ({
        root: DynamicPage,
        page: p
      }));
  }

  onTabChange(title) {
    console.log(`tab changed to: ${title}`);
  }
}
