import {combineReducers, Reducer} from 'redux';
import {AppData} from "./models/app-data";
import {app} from "./reducers/app-data-reducers";
import {hasTabs} from "./reducers/has-tab-reducer";
import {platform} from "./reducers/platform-reducer";

export interface IAppState {
  app?:         AppData;
  hasTabs?:     boolean;
  platform?:    string;
}

/**
 * combineReducers() will combine all the reducers in our application.
 *
 * We use the ES6 object literal property value shorthand to construct the object that's passed to combineReducers()
 *
 * To add a new key in the state object you'll need to create a new reducer function
 * (which also means a new file in this /reducers folder). Then you import the new reducer function and use it in the object below
 *
 * @type {Reducer<IAppState>}
 */
export const rootReducer: Reducer<IAppState> = combineReducers({
  app,
  hasTabs,
  platform,
});
