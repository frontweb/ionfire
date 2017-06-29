import {Component, Input} from '@angular/core';
import {SocialMediaLinks} from "../../redux/models/app-data";
import {InAppBrowserService} from "../../providers/in-app-browser-service";

/*
  Display links to social media.

  Links can be icon-only or full-width buttons
*/
@Component({
  selector: 'social-media-links',
  templateUrl: 'social-media-links.html'
})
export class SocialMediaLinksComponent {

  static DEFAULT_SOCIAL_NETWORK = 'website';

  @Input() socialMediaLinks: SocialMediaLinks;

  constructor(private inAppBrowser: InAppBrowserService) {
  }

  openUrl(url) {
    this.inAppBrowser.openBlank(url);
  }

  /**
   * Check the hostname of a URL and return the social media name (to which the link belongs to)
   * @param url (i.e.: https://www.facebook.com/MobiPromoPlatform/)
   * @return {string} (i.e.: 'facebook')
   */
  network(url) {
    if (!url) return SocialMediaLinksComponent.DEFAULT_SOCIAL_NETWORK;

    if (url.indexOf('facebook.com') !== -1) {
      return 'facebook';
    }
    else if (url.indexOf('instagram.com') !== -1) {
      return 'instagram';
    }
    else if (url.indexOf('twitter.com') !== -1) {
      return 'twitter';
    }
    else if (url.indexOf('plus.google.com') !== -1) {
      return 'google';
    }
    else if (url.indexOf('reddit.com') !== -1) {
      return 'reddit';
    }
    else if (url.indexOf('pinterest.com') !== -1) {
      return 'pinterest';
    }

    return SocialMediaLinksComponent.DEFAULT_SOCIAL_NETWORK;
  }
}
