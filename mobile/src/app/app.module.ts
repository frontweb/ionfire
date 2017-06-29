import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {FullPageSpinner} from "../components/full-page-spinner/full-page-spinner";
import {CTAPanel} from "../components/cta-panel/cta-panel";
import {NgReduxModule} from "ng2-redux";
import {APP_REDUX_PROVIDERS} from "../redux/actions/index";
import {SideMenuFooter} from "../components/side-menu-footer/side-menu-footer";
import {InAppBrowserService} from "../providers/in-app-browser-service";
import {SideMenuLogo} from "../components/side-menu-logo/side-menu-logo";
import {SocialMediaLinksComponent} from "../components/social-media-links/social-media-links";
import {DynamicPage} from "../pages/dynamic-page/dynamic-page";
import {TabsPage} from "../pages/tabs-page/tabs-page";
import {ContentBlock} from "../components/content-block/content-block";
import {ContentBlockHostDirective} from "../components/content-block/directives/content-block-host-directive";
import {CONTENT_BLOCK_COMPONENTS} from "../components/content-block/components/index-content-block-components";
import {RawStylesDirective} from "../directives/raw-styles-directive";
import {DynamicComponentModule} from "angular2-dynamic-component";
import {PIPES} from "../pipes/index-pipes";
import {FeedVideo} from "../components/feed-video/feed-video";
import {FeedEnhancerService} from "../providers/feed-enhancer-service";
import {BrowserModule} from "@angular/platform-browser";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {AngularFireModule} from "angularfire2";
import {APP_CONFIG} from "./app.config";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    FullPageSpinner, CTAPanel,
    SideMenuFooter, SideMenuLogo, SocialMediaLinksComponent,
    DynamicPage, ContentBlock,
    ContentBlockHostDirective, RawStylesDirective,
    CONTENT_BLOCK_COMPONENTS, FeedVideo,
    PIPES
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(APP_CONFIG['firebaseConfig']),
    NgReduxModule,
    DynamicComponentModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    DynamicPage,
    CONTENT_BLOCK_COMPONENTS
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    APP_REDUX_PROVIDERS,
    InAppBrowserService,
    FeedEnhancerService,
    InAppBrowser
  ]
})
export class AppModule {
}
