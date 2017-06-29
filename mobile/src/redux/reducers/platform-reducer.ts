export interface ISetPlatformAction {type:string; platform: string;}

export const SET_PLATFORM = 'SET_PLATFORM';

export function platform(state: string = 'android', action: ISetPlatformAction) {
  switch (action.type) {
    case SET_PLATFORM:
      return action.platform;

    default:
      return state;
  }
}
