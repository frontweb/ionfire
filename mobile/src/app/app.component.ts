import {Component, OnInit, ViewChild} from "@angular/core";
import {MenuController, Nav, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {DevToolsExtension, NgRedux} from "ng2-redux";
import {IAppState, rootReducer} from "../redux/index-redux";
import createLogger from "redux-logger";
import {AppData, IPage, PoweredBy} from "../redux/models/app-data";
import {DynamicPage} from "../pages/dynamic-page/dynamic-page";
import {DomSanitizer} from "@angular/platform-browser";
import {AppActions} from "../redux/actions/app-actions";
import {AngularFireDatabase} from "angularfire2/database";
import {TabsPage} from "../pages/tabs-page/tabs-page";

declare var cordova: any;

@Component({
  templateUrl: 'app.html',
  providers: [SplashScreen, StatusBar, AngularFireDatabase]
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav;

  rootPage = null;

  app: AppData;
  pages: IPage[];

  constructor(private platform: Platform, private devTools: DevToolsExtension,
              private ngRedux: NgRedux<IAppState>, private appActions: AppActions,
              private menuCtrl: MenuController, private sanitizer: DomSanitizer,
              private splashScreen: SplashScreen, private statusBar: StatusBar,
              private angularFireDatabase: AngularFireDatabase) {
    this.setupRedux();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Proxy all window.open calls through InAppBrowser
      // (this is used by the feed items, for the URLs replaced in the item message)
      if (window['cordova'] && cordova['InAppBrowser']) {
        window.open = cordova.InAppBrowser.open;
      }
    });

    this.ngRedux.select('app').subscribe((app: AppData) => {
      this.app = app;
      this.pages = app && app.pages && app.pages.filter((p: IPage) => !p.showAsTab) || null;
    });
  }

  ngOnInit(): void {
    this.angularFireDatabase
      .object('/prod')
      .subscribe((appData) => {
        this.appActions.setAppData(appData);

        if (appData && appData.pages) {
          this.setupPages(appData);
          this.appTheme();
          this.appStyles();
        }
        else {
          console.log(`App data is null or 'pages' key is missing`);
        }
      }, (e) => {
        console.log(`Error fetching app data`, e);
      });
  }

  // Configure redux store (and enable Chrome dev tools)
  // In dev mode try to load state from local storage
  private setupRedux() {
    let initState = {
      platform: this.platform.is('ios') ? 'ios' : 'android'
    };

    let enhancers = this.devTools.isEnabled() ? [this.devTools.enhancer()] : [];
    this.ngRedux.configureStore(rootReducer, initState, [createLogger()], enhancers);
  }

  setupPages(appData) {
    const pages = appData.pages || [];

    if (pages.find((p: IPage) => p.showAsTab)) { // Set the nav controller root to the TabsPage
      this.nav.setRoot(TabsPage);
    }
    else { // Set the first page as the root
      if (pages.length > 0) {
        this.nav.setRoot(DynamicPage, pages[0]);
      }
      else { // Set root as a blank page (to allow user to still do some basic customization, like theme for example)
        const blankPage: IPage = {
          title: `No content`,
          contentBlocks: [
            {
              component: 'HtmlBlock',
              data: {
                componentTemplate: `<ion-card><ion-card-content><ion-card-header>The app has no content defined</ion-card-header><p>Use the MobiPromo online editor to add content to your app.</p></ion-card-content></ion-card>`
              }
            }
          ]
        };
        this.nav.setRoot(DynamicPage, blankPage);
      }
    }
  }

  onSideMenuOpen() {
  }

  poweredBy(): PoweredBy {
    return this.app && this.app.metadata && this.app.metadata.poweredBy;
  }

  appTheme(): string {
    return this.app && this.app.theme || '';
  }

  appStyles() {
    return this.app && this.app.styles ? this.sanitizer.bypassSecurityTrustHtml(`<style>${this.app.styles}</style>`) : null;
  }

  openPage(page: IPage) {
    this.menuCtrl.close().then(() => {
      if (this.ngRedux.getState().hasTabs) {
        this.nav.push(DynamicPage, page);
      }
      else {
        this.nav.setRoot(DynamicPage, page);
      }
    });
  }

  onExitAppPreview() {
    this.menuCtrl.close().then(() => {
      this.appActions.clearAppData();
    });
  }
}
