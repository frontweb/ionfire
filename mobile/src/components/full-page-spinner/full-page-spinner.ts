import {Component, Input} from '@angular/core';

/*
  A spinner centered in the middle of the page,
  displaying a message (optionally(
*/
@Component({
  selector: 'full-page-spinner',
  templateUrl: 'full-page-spinner.html'
})
export class FullPageSpinner {

  @Input() message;

  constructor() {}

}
