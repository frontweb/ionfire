import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {AppLogo} from "../../redux/models/app-data";

/*
  Displays:
    - app name
    - app icon/logo
    - tagline
*/
@Component({
  selector: 'side-menu-logo',
  templateUrl: 'side-menu-logo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuLogo {
  @Input() appName: string;
  @Input() appLogo: AppLogo;

  constructor() {
  }

}
