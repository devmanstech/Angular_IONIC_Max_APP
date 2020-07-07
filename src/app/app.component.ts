import { Component, ViewChild} from '@angular/core';
import { Platform, Nav, ModalController, ViewController, PopoverController, MenuController, AlertController} from 'ionic-angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SplashScreen} from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { HomePage} from "../pages/home/home";
import { NewsPage, ShowModelPage} from "../pages/news/news";
import { AboutPage} from "../pages/about/about";
import { ContactPage} from "../pages/contact/contact";
import { RadioService} from "../services/radio-service";
import { ApiService} from "../services/api-services";
import { PushOptions, Push, PushObject} from "@ionic-native/push";
import { SettingsPage} from "../pages/settings/settings";
import { CapitalstationPage} from "../pages/capitalstation/capitalstation";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Popover1Page } from '../pages/popover1/popover1';
import { OpinionAbujaPage } from '../pages/opinionAbuja/opinionAbuja';
import { OpinionLagosPage } from '../pages/opinionLagos/opinionLagos';
import { NetworkErrorPage } from '../pages/network-error/network-error';
import { Market } from '@ionic-native/market';
import { AppVersion } from '@ionic-native/app-version';
// Proverders
import { ServicesProvider } from "../providers/services/services";
import { ImageLoaderConfig } from 'ionic-image-loader';
import { NetworkProvider, ConnectionStatus } from '../providers/network/network';
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  contactpage: any = ContactPage;
  @ViewChild(Nav) nav: Nav
  rootPage: any = HomePage;
  homePage: any = HomePage;
  newspage: any = NewsPage;
  aboutpage: any = AboutPage;
  settingspage:any=SettingsPage;
  capitalstation:any=CapitalstationPage;
  buttonColor: string = '#122851';
  pageName:any='HomePage';
  regions:any = [];

  lo_fi:boolean = false

  constructor(public deeplinks: Deeplinks, private alertCtrl: AlertController,private market: Market,private appVersion: AppVersion,private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, imageLoaderConfig: ImageLoaderConfig,
    public service: ServicesProvider, private oneSignal: OneSignal, public networkStatus: NetworkProvider,
    private push: Push, public inApp: InAppBrowser, public menuCtrl: MenuController, 
    public radioService:RadioService, public popoverCtrl: PopoverController, 
    public apiService:ApiService, public modalCtrl:ModalController, private apiServices: ApiService) {
    
    if (platform.is('ios')
      || platform.is('android')
      || platform.is('windows')) {
      // enableProdMode();
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.initPush()
      statusBar.styleDefault();
      splashScreen.hide();
      this.versionapp();
      this.initializeApp();

      imageLoaderConfig.enableSpinner(true);
      imageLoaderConfig.setFallbackUrl('assets/imgs/placeholder.png');


      // initialize push
      if(platform.is('cordova')){
             console.log("cdon")
        this.oneSignal.getTags().then((value) => {
          console.log('Tags Received: ' + JSON.stringify(value));
        });

        this.oneSignal.startInit('fa0b792d-4385-4a7c-87d7-5e3bd27c0942', '420453837526');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
         // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });
        
        this.oneSignal.addSubscriptionObserver().subscribe((response) => {
          console.log("user subscription", response);
          // this.storageService.setPushSubscribed(response.to.subscribed);
        });
        this.oneSignal.endInit();
        this.oneSignal.getIds().then(res=>
          {
            console.log(res)
          })
      }

      this.deeplinks.routeWithNavController(this.nav, {
        '/items/:itemId': ShowModelPage 
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.log('Unmatched Route', nomatch);
      });
    });

    this.getRegion();

    radioService.onRegionChange.subscribe( () => {
      this.changeRegion();
    })

  }

  iconMenu = {
    theme: 'ios',
    type: 'hamburger'
  };

  initializeApp(): void {
    /* Check networkStatus */
    this.networkStatus.initializeNetworkEvents();
    this.networkStatus.getNetworkStatus().subscribe((status) => {
      console.log('network status ==> ', (status == ConnectionStatus.Offline));
      if (status == ConnectionStatus.Offline) {
        let network = this.modalCtrl.create(NetworkErrorPage, null, {enableBackdropDismiss:false});
        network.present();
      }else{
        this.radioService.playResume();
      }
      
    })
  }


  presentPopover(event) {
    let popover = this.popoverCtrl.create(Popover1Page);
    popover.present({ ev: event });
    popover.onDidDismiss(() => {
      // Navigate to new page.  Popover should be gone at this point completely
      //this.viewCtrl.dismiss();
      this.nav.setRoot(HomePage);
      this.menuCtrl.close();
    });
  }

  
  openPage(page) {
    this.nav.setRoot(page).then(()=>{
      this.pageName= this.nav.getActive().name
    })
  }

  openWebView(){
    
    if(this.radioService.radioOptions.region == 'Lagos'){
      this.nav.push(OpinionLagosPage)
    } else {
      this.nav.push(OpinionAbujaPage)
    }
  }

  initPush(){
    // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }
    });

    // to initialize push notifications
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  addEvent(id){
    document.getElementById('1').style.backgroundColor='transparent';
    document.getElementById('2').style.backgroundColor='transparent';
    document.getElementById('3').style.backgroundColor='transparent';
    document.getElementById('4').style.backgroundColor='transparent';
    document.getElementById(id).style.backgroundColor='#fe332d';

  }

  openModel(){
    // let customModal = this.modalCtrl.create(ShowInfoPage, {},{showBackdrop: true, enableBackdropDismiss: true});
    // customModal.present();
  }

  changeLowStreaming(){
    console.log("MyApp::changeLowStreaming", this.lo_fi)
    if(this.lo_fi){
      console.log(this.radioService.lowFiUrl+"stream");
      this.radioService.radioOptions.datasaver = true;
      if(this.radioService.isPlaying){
        this.radioService.stopAudio();
        this.radioService.file.src = this.radioService.lowFiUrl+"stream";
        this.radioService.playAudio(true);
      }else{
        this.radioService.file.src = this.radioService.lowFiUrl+"stream";
      }
    }else{
      this.radioService.radioOptions.datasaver = false;
      console.log(this.radioService.url+"stream");
      if(this.radioService.isPlaying){
        this.radioService.stopAudio();
        this.radioService.file.src = this.radioService.url+"stream";
        this.radioService.playAudio(true);
      }else{
        this.radioService.file.src = this.radioService.url+"stream";
      }
    }
  }

  getRegion() {
    this.service.getRegionData().then((results: any) => {
      if (results instanceof Array) {
        this.regions=results;
      }
      
      console.log("getRegionData", (results instanceof Array), results );
    });
  }


  changeRegion(){
    console.log("HomePage::changeRegion", this.radioService.radioOptions.region, this.regions)
    let regionData: any;
    let datasaver_strem_link = ""
    let region = this.radioService.radioOptions.region;
    for(let i = 0; i< this.regions.length; i++){
      if(this.regions[i].region_name.toLowerCase() == region.toLowerCase()){
        if(i == this.regions.length - 1){
          regionData = this.regions[0];
        }else{
          regionData = this.regions[i+1];
        }
      }
    }
    for(let i = 0; i < this.radioService.lowFiUrls.length; i++){
      if(this.radioService.lowFiUrls[i].region_name.toLowerCase() == region.toLowerCase()){
        if(i == this.radioService.lowFiUrls.length - 1){
          datasaver_strem_link = this.radioService.lowFiUrls[0].region_strem_link;
        }else{
          datasaver_strem_link = this.radioService.lowFiUrls[i+1].region_strem_link;
        }
      }
    }

    if (!regionData) {
      return
    }
    let json_url = regionData.json_url;
    let lastSlash = json_url.lastIndexOf('/');
    let region_strem_link = '';
    // let region_standard_stream_link = '';
    if(lastSlash == json_url.length - 1){
       json_url = regionData.json_url.substr(0, lastSlash);
    }
    let audioUrl = regionData.region_stream_link.split('/');
    if(audioUrl[audioUrl.length -1] == 'stream'){
      region_strem_link = regionData.region_stream_link.substr(0, regionData.region_stream_link.lastIndexOf('/')+1);
    }
    // let lofiUrl = 
    // regionData.region_standard_stream_link.split('/');  
    // if(audioUrl[audioUrl.length -1] == 'stream'){
    //   region_standard_stream_link = regionData.region_standard_stream_link.substr(0, regionData.region_standard_stream_link.lastIndexOf('/')+1);
    // } 
    // console.log("region link: ", region_strem_link);
    // console.log("json_url : ", json_url);
    
    this.apiServices.url = json_url;
    this.service.url = json_url;
    this.apiServices.changeJsonUrl(json_url);
    this.apiServices.getPostData()
    this.apiServices.getFeturedPhoto()
    
    this.radioService.url = region_strem_link;
    this.radioService.lowFiUrl = datasaver_strem_link;
    this.radioService.radioOptions.region = regionData.region_name;
    
    console.log("dataSaver is it: ", this.radioService.radioOptions.datasaver);
    if(this.radioService.isPlaying){
      this.radioService.stopAudio();
      if(this.radioService.radioOptions.datasaver){
        this.radioService.file.src = datasaver_strem_link+"stream";
      }else{
        this.radioService.file.src = region_strem_link+"stream";
      }
      this.radioService.playAudio(true);
    }else{
      if(this.radioService.radioOptions.datasaver){
        this.radioService.file.src = datasaver_strem_link+"stream";
      }else{
        this.radioService.file.src = region_strem_link+"stream";
      }
    }
    this.radioService.getStreamInfo(region_strem_link);
  }
  
  showAlert(type)
{
  let alert = this.alertCtrl.create({
    title: 'Update Available',
    message: 'Please upgrade to the latest version to get the best app experience',
    buttons: [
      {
        text: 'No, thanks',
        role: 'cancel'
      },
      {
        text: 'Yes, Update for me',
        handler: () => {
        if(type)
        {
          this.market.open("id1421225542")
        }
        else
        {
          this.market.open("com.app.thrilliantnigeriamaxfmng")
        }
        }
      }
    ]
  });
  alert.present();
}

  versionapp()
  {
    this.apiService.getAppVersion().map(res=>res.json()).subscribe(res=>
    {
    let dt=res;
   if(this.platform.is("android"))
   {
      this.appVersion.getVersionCode().then(version=>
        {
           if(version!=dt["android"])
           {
             this.showAlert(false);        
           }
        })
   }
   else
   {
    this.appVersion.getVersionCode().then(version=>
      {
         if(version!=dt["ios"])
         {
           this.showAlert(true);
         }
      })
   }
    });
  }
}


@Component({
  selector: 'page-showInfo',
  templateUrl:'showInfo.html',
})

export class ShowInfoPage {
  schedules:any=[];
  showTitle:string=''
  startTime:string=''
  endTime:string=''
  
  constructor(public viewCtrl: ViewController,
    public apiServices:ApiService,public radioService:RadioService) {
  }
  ionViewDidLoad() {
    console.log(1234);
    // this.schedules=this.apiServices.scheduleData;
    console.log(this.schedules);

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
