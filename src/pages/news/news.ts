import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, FabContainer, LoadingController, ModalController, ViewController, Nav, Content} from 'ionic-angular';
// import {ApiService} from "../../services/api-services";
import {ServicesProvider} from "../../providers/services/services";
import {Http} from "@angular/http";
// import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import $ from "jquery";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';


/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  @ViewChild(Nav) nav: Nav
  pet: any;
  topStories: any;
  id: any;
  page: number;
  slug:string;
  categoryPost: any;
  businessPost: any;
  categoryTitle: any;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams,  
    public loadingCtrl: LoadingController, public service: ServicesProvider, public modalCtrl: ModalController) {
    this.getCategoryTitle();
  }

  ionViewDidLoad() {

  }
 
  getBusinessPost(page, petTitle) {
    this.businessPost = undefined
    this.page=page
    this.slug=petTitle;
    this.pet = petTitle;
    console.log(this.pet);
    this.service.getPosts(petTitle)
      .then((results: any) => {
        this.businessPost = results.posts
        if (petTitle == "photos") {
          $('#scrollable').scrollLeft($('#segment_' + petTitle).position().left)
        }
      });
    console.log(this.businessPost);
  }

  doInfinite(infiniteScroll) {
    this.page = Number(this.page)+1;
    console.log(this.page);
    console.log(typeof this.page);
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        this.service.getPaginationPosts(this.slug ,this.page)
          .then((results: any) => {
            this.businessPost = [...this.businessPost,...results.posts]
            console.log(results.posts)
            console.log(this.businessPost)
            resolve();
          }).catch(err=>{
            reject(err)
        });
      }, 500);
    })
  }

  getCategoryTitle() {
    this.service.getCategory().then((results: any) => {
      this.categoryTitle = results;
      if (results && results.categories) {
        if (this.navParams.get("items")) {
          this.getBusinessPost("1", "photos")
        } else {
          this.getBusinessPost("1", this.categoryTitle.categories[0].slug)
        }
      }
      console.log(results);
    });
  }

  openModelData(post) {

    this.navCtrl.push(ShowModelPage, {post: post})
    // let customModal = this.modalCtrl.create(ShowModelPage, {post: post});
    // customModal.present();
  }

}




@Component({
  selector: 'page-showModel',
  templateUrl: 'showModel.html',
})
export class ShowModelPage {
  id: any;
  post: any;
  
  modelData: any;
  item:any
  form: any;
  relatedPosts: any;
  message: any;
  url: any;
  image: any;
content:any="";
@ViewChild(Content) contents: Content;
  constructor(private _sanitizer:DomSanitizer,public viewCtrl: ViewController, public navParams: NavParams, public http: Http, public navCtrl: NavController,
    public modalCtrl: ModalController, private service: ServicesProvider, public loadingCtrl: LoadingController, 
    private socialSharing: SocialSharing) {
    console.log(navParams.data)
    let post = this.navParams.get("post")
   
    let id = navParams.data.id
    this.item = this.navParams.get("item")
    console.log(this.item)

    this.form = [];
    if (post) {
      this.post = post
      this.content=this._sanitizer.bypassSecurityTrustHtml(post.content)
      if (this.post.categories && this.post.categories.length == 1) {
        this.getMostPopNews(this.post.categories[0].id, null)
      }
      
		
    }else if (id) {
      
      this.id = id;
      this.service.getPost(this.id)
         .then((results) => this.handlePostResults(results));
    }
    else if (navParams.data.itemId) {
     
      this.id = navParams.data.itemId
      this.service.getPost(this.id)
         .then((results) => this.handlePostResults(results));
    }
    
  }

  ionViewDidLoad() {
    console.log("ShowModelPage::ionViewDidLoad", this.navParams.get("post"))
    this.instagramPosts();
  
    
  }

  getMostPopNews(id, page){
    this.service.getRelatedPosts(id, page)
    .then((results) => {
      console.log("getMostPopNews", id, page, results);
      this.relatedPosts = results
    });
  }

  handlePostResults(results){
    console.log("handlePostResults", results);
    this.post = results.post;
    this.content=this._sanitizer.bypassSecurityTrustHtml(results.post.content)
    if(this.post.categories.length){
      this.getMostPopNews(this.post.categories[0].id, null)
    }
    setTimeout(() => {
      this.contents.resize();
    }, 3000);
  }

  getPost(item, post){
    console.log("getPost", item, post);
    this.item = [];
    this.item.id = item.id;
    this.item.name = post.categories[0].title;
    this.navCtrl.push(ShowModelPage, this.item);
  }


/*
  getCategoryNews(id,page){
    this.service.getCategoryPost(id,page)
    .then((results) => {
      let categoryData: any = results
      this.categoryPost = JSON.parse(categoryData._body)
    });
  }

  getTopStories(page){
    this.service.getTopPosts(page).then((results) => {
      let storiesData: any = results
      this.topStories = JSON.parse(storiesData._body)
      console.log(this.topStories);
    });
  }

*/
  


   shareWithFb(post, network: string, fab: FabContainer){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    if (post) {
      this.message = post.title; // not supported on some apps (Facebook, Instagram)
      this.image = post.thumbnail; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = post.url;
    }else if (this.item) {
      this.message = this.item.title; // not supported on some apps (Facebook, Instagram)
      this.image = this.item.image; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = this.item.url;
    }else{
      return;
    }
      
    // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.present();
    loading.onWillDismiss(() => {
      fab.close();
    });
    

    this.socialSharing.shareViaFacebook(null, null, this.url);
  }

  shareWithTw(post, network: string, fab: FabContainer){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    
    if (post) {
      this.message = post.title; // not supported on some apps (Facebook, Instagram)
      this.image = post.thumbnail; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = post.url;
    }else if (this.item) {
      this.message = this.item.title; // not supported on some apps (Facebook, Instagram)
      this.image = this.item.image; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = this.item.url;
    }else{
      return;
    }

    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.present();
    loading.onWillDismiss(() => {
      fab.close();
    });
    
    this.socialSharing.shareViaTwitter(this.message, this.image, this.url);
  }

  shareWithGmail(post){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    
    if (post) {
      this.message = post.title; // not supported on some apps (Facebook, Instagram)
      this.image = post.thumbnail; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = post.url;
    }else if (this.item) {
      this.message = this.item.title; // not supported on some apps (Facebook, Instagram)
      this.image = this.item.image; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = this.item.url;
    }else{
      return;
    }

    this.socialSharing.shareViaEmail(this.url, this.message, [this.image]);
  }

   shareWithWhatsapp(post, network: string, fab: FabContainer){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    if (post) {
      this.message = post.title; // not supported on some apps (Facebook, Instagram)
      this.image = post.thumbnail; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = post.url;
    }else if (this.item) {
      this.message = this.item.title; // not supported on some apps (Facebook, Instagram)
      this.image = this.item.image; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = this.item.url;
    }else{
      return;
    }
    
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();

     this.socialSharing.shareViaWhatsApp(null, null, this.url);
  }

  removeScript(){
    let fjs = document.getElementsByTagName('script')[0]

fjs.parentNode.removeChild(document.getElementById('instagram-wjs'));

}

instagramPosts(){
 this.update(document, "script", "instagram-wjs");
}

update (d, s, id){
  let js: any;
  let fjs = d.getElementsByTagName(s)[0];

  if (! d.getElementById(id)) {
    js = d.createElement(s);
    js.setAttribute("onLoad","window.instgrm.Embeds.process()");
    js.id = id;
    js.src = "https://platform.instagram.com/en_US/embeds.js";

    fjs.parentNode.insertBefore(js,fjs);
  }
} 
  public dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewWillLeave(){ this.removeScript(); }
}
