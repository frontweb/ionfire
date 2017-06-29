import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux";
import {IAppState} from "../index-redux";
import {AppData, IPage} from "../models/app-data";
import {CLEAR_APP_DATA, SET_APP_DATA} from "../reducers/app-data-reducers";
import {SET_HAS_TABS} from "../reducers/has-tab-reducer";

@Injectable()
export class AppActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}

  setAppData(appData: AppData) {
    this.ngRedux.dispatch({type: SET_APP_DATA, appData});

    let hasTabs = appData && appData.pages
      && appData.pages.find((p: IPage) => p.showAsTab);
    this.ngRedux.dispatch({type: SET_HAS_TABS, hasTabs: !!hasTabs});
  }

  clearAppData() {
    this.ngRedux.dispatch({type: CLEAR_APP_DATA});
  }
}
