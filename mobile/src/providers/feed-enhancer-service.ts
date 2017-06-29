import {IFeedItem, CTA_ACTION_OPEN_EMAIL, CTA_ACTION_OPEN_URL} from "../redux/models/feed-interfaces";
import {Injectable} from "@angular/core";
import {IAppState} from "../redux/index-redux";
import {NgRedux} from "ng2-redux";

@Injectable()
export class FeedEnhancerService {
  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  /**
   * Add a button configuration to each item in the feed
   */
  addButtons(items: IFeedItem[]) {
    return items.map((item) => {
      if (!item.cta && item.data.url) {
        item.cta = {};
        let msg = item.data.message && item.data.message.toLowerCase() || null;
        if (msg && (msg.indexOf('#buynow') != -1 || msg.indexOf('#ordernow') != -1)) {
          item.cta = {
            label: `Order now`,
            action: CTA_ACTION_OPEN_EMAIL,
            email: this.ngRedux.getState().app.shopEmail
          }
        }
        else if (item.type.indexOf('video') != -1) {
          item.cta = {
            label: `Watch video`,
            action: CTA_ACTION_OPEN_URL,
            url: item.data.url
          }
        }
        else { // Default to 'Read more'
          item.cta = {
            label: `Read more`,
            action: CTA_ACTION_OPEN_URL,
            url: item.data.url
          }
        }
      }

      return item;
    });
  }
}
