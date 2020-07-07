import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp, ShowInfoPage } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NewsPage, ShowModelPage } from "../pages/news/news";
import { HttpClientModule } from "@angular/common/http";
import { Media } from '@ionic-native/media';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OneSignal } from '@ionic-native/onesignal';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { RadioService } from "../services/radio-service";
import { HttpModule } from "@angular/http";
import { ApiService } from "../services/api-services";
import { PipesModule } from "../pipes/pipes.module";
import { Push } from "@ionic-native/push";
import { ServicesProvider } from '../providers/services/services';
// import { Services } from "@angular/core/src/view";
import { MusicControls } from "@ionic-native/music-controls";
import { SettingsPage } from "../pages/settings/settings";
import { CapitalstationPage } from "../pages/capitalstation/capitalstation";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Popover1Page } from '../pages/popover1/popover1';
import { PopoverPage } from '../pages/popover/popover';
import { CompetitionPage } from '../pages/competition/competition';
import { ContactPRPage } from '../pages/contactPR/contactPR';
import { PremiumRatePage } from '../pages/premiumrate/premiumrate';
import { PrivacyPage } from '../pages/privacy/privacy';
import { ProvideFeedbackPage } from '../pages/providefeedback/providefeedback';
import { ThirdPartyPage } from '../pages/thirdparty/thirdparty';
import { TermsPage } from '../pages/terms/terms';
import { OpinionLagosPage } from '../pages/opinionLagos/opinionLagos';
import { OpinionAbujaPage } from '../pages/opinionAbuja/opinionAbuja';
import { NetworkErrorPage } from '../pages/network-error/network-error';
import { IonicImageLoader } from 'ionic-image-loader';
import { NetworkProvider } from '../providers/network/network';
import { Market } from '@ionic-native/market';
import { AppVersion } from '@ionic-native/app-version';
import { Deeplinks } from '@ionic-native/deeplinks';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPage,
    ShowInfoPage,
    ShowModelPage,
    SettingsPage,
    CapitalstationPage,
    PopoverPage,
    Popover1Page,
    CompetitionPage,
    ContactPRPage,
    PremiumRatePage,
    PrivacyPage,
    ProvideFeedbackPage,
    ThirdPartyPage,
    TermsPage,
    OpinionLagosPage,
    OpinionAbujaPage, NetworkErrorPage
  ],
  imports: [
    BrowserModule, PipesModule,
    HttpClientModule, HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPage,
    ShowInfoPage,
    ShowModelPage,
    SettingsPage,
    CapitalstationPage,
    Popover1Page,
    CompetitionPage,
    ContactPRPage,
    PremiumRatePage,
    PrivacyPage,
    ProvideFeedbackPage,
    ThirdPartyPage,
    TermsPage, 
    OpinionLagosPage,
    OpinionAbujaPage, NetworkErrorPage
  ],
  providers: [
    StatusBar,
    Market,
    AppVersion,
    Deeplinks,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }, Media, RadioService, ApiService, Push,
    BackgroundMode, ServicesProvider, MusicControls, InAppBrowser, SocialSharing, OneSignal, Network,
    NetworkProvider
  ]
})
export class AppModule {
}
