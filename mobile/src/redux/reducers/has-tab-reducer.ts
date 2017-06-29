export interface IHasTabsAction {type:string; hasTabs: boolean;}

export const SET_HAS_TABS = 'SET_HAS_TABS';

export function hasTabs(state: boolean = false, action: IHasTabsAction) {
  switch (action.type) {
    case SET_HAS_TABS:
      return action.hasTabs;

    default:
      return state;
  }
}
