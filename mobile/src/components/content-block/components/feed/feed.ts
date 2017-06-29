import {Component, Input, OnInit} from "@angular/core";
import {ContentBlockParams} from "../../content-block-params";
// import URI from "urijs";
import {DomSanitizer} from "@angular/platform-browser";
import {InAppBrowserService} from "../../../../providers/in-app-browser-service";
import {EmailComposer} from "@ionic-native/email-composer";
import {AlertController, NavController} from "ionic-angular";
import {
  IFeedData,
  IFeedItem,
  IFeedItemCta,
  CTA_ACTION_OPEN_EMAIL,
  CTA_ACTION_OPEN_URL
} from "../../../../redux/models/feed-interfaces";
import {FeedEnhancerService} from "../../../../providers/feed-enhancer-service";
import {IPage} from "../../../../redux/models/app-data";
import {DynamicPage} from "../../../../pages/dynamic-page/dynamic-page";

declare var cordova: any;

/*
  Render a list of items (coming from a feed)
*/
@Component({
  selector: 'feed',
  templateUrl: 'feed.html',
  providers: [EmailComposer]
})
export class Feed implements ContentBlockParams, OnInit {
  @Input() data: IFeedData;

  constructor(private sanitizer: DomSanitizer,
              private inAppBrowserService: InAppBrowserService, private nav: NavController,
              private alertCtrl: AlertController, private feedEnhancer: FeedEnhancerService, private emailComposer: EmailComposer) {
  }

  ngOnInit(): void {
    this.constructButtons();
  }

  // Loop through items and add a cta configuration (if not present already)
  constructButtons() {
    this.data.items = this.feedEnhancer.addButtons(this.data.items);
  }

  isVideo(item: IFeedItem): boolean {
    return item && item.type.indexOf('video') !== -1;
  }

  // Main content for the card
  cardContent(text: string) {
    // if (text) {
    //   text = URI.withinString(text, (url) => `<a href="#" onclick="window.open('${url}', '_blank')">${url}</a>`);
    //   return this.sanitizer.bypassSecurityTrustHtml(text);
    // }
    // else return null;
    return text;
  }

  // Handle click on CTA button (from a card)
  ctaClick(cta: IFeedItemCta) {
    if (cta.action === CTA_ACTION_OPEN_URL) { // Open url
      this.inAppBrowserService.openBlank(cta.url);
    }
    else if (cta.action === CTA_ACTION_OPEN_EMAIL) { // Open email
      this.openEmail(cta.email);
    }
  }

  // Push a page with an HtmlBlock
  pushDynamicPage(title: string, content: string) {
    let page: IPage = {
      title,
      contentBlocks: [
        {
          component: 'HtmlBlock',
          data: {
            componentTemplate: `<ion-card><ion-card-content>${content}</ion-card-content></ion-card>`
          }
        }
      ]
    };
    this.nav.push(DynamicPage, page);
  }

  openEmail(email: string) {
    // http://ionicframework.com/docs/v2/native/email-composer/
    this.emailComposer.isAvailable().then(() => {
      const emailConfig = {
        app:      'mailto',
        to:       email,
        isHtml:   false
      };
      cordova.plugins.email.open(emailConfig, () => {
        console.log('email composer dismissed');
      });
    }, error => {
      console.log('Email composer not available: ', error);
      let alert = this.alertCtrl.create({
        subTitle: `Please email ${email}`,
        buttons: ['Ok']
      });
      alert.present();
    });
  }
}
