import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

/*
  Displays 'Powered by MobiPromo' and app version.

  Tell Angular that this component can skip change detection, if its inputs haven’t changed.
*/
@Component({
  selector: 'side-menu-footer',
  templateUrl: 'side-menu-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuFooter {
  @Input() appVersion: string;

  constructor() {
  }
}
