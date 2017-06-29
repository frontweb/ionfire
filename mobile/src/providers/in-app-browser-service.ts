import {Injectable} from "@angular/core";
import {InAppBrowser} from "@ionic-native/in-app-browser";

declare var cordova: any;

@Injectable()
export class InAppBrowserService {
  constructor(private inAppBrowser: InAppBrowser) {
  }

  openBlank(url) {
    this.open(url, '_blank');
  }

  openSystem(url) {
    this.open(url, '_system');
  }

  private open(url, target) {
    if (window['cordova'] && cordova['InAppBrowser']) {
      this.inAppBrowser.create(url, target);
    }
    else {
      window.open(url, target);
    }
  }
}
