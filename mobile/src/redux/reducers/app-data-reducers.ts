import {AppData} from "../models/app-data";

export interface IAppDataAction {type:string; appData?: AppData}

export const SET_APP_DATA = 'SET_APP_DATA';
export const CLEAR_APP_DATA = 'CLEAR_APP_DATA';

export function app(state: AppData = {}, action: IAppDataAction): AppData {
  switch (action.type) {
    case SET_APP_DATA:
      return Object.assign({}, state, action.appData);

    case CLEAR_APP_DATA:
      return {};

    default:
      return state;
  }
}
