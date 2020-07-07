import {Component, ViewChild} from '@angular/core';
import {NavController, Nav, ModalController} from 'ionic-angular';
import {RadioService} from "../../services/radio-service";
import {ApiService} from "../../services/api-services";
import {DomSanitizer} from "@angular/platform-browser";
import { Http} from "@angular/http";
import {ServicesProvider} from "../../providers/services/services";
import {NewsPage, ShowModelPage} from "../news/news";
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
  selector: 'page-home', animations: [
    trigger(
      'enterAnimation', [
        state('in', style({opacity: 1})),
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms')
        ]),
        transition(':leave', 
          animate(600, style({opacity: 0}))
        )
      ]
    )
  ],
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav
  schedules: any = []
  sliderPhoto: any;
  photoPost: any;

  constructor(public http: Http, public navCtrl: NavController, public radioService: RadioService, 
    public apiServices: ApiService, private _sanitizer: DomSanitizer, public service: ServicesProvider, public modalCtrl: ModalController) {
    this.apiServices.getFeturedPhoto()
    // this.getSliderPhoto();
  }

  setMyStyles() {
    let styles = {}
    if(this.radioService.radioOptions.region == 'Lagos'){
      styles = {
        background: '#fb3336',        
      };
    }
    else {
      styles = {
        background: '#222',        
      };
    }
  
    return styles;
  }

  getPlayingData(){
    if(this.radioService.radioOptions.region == 'Lagos') {

    } else {

    }
  }

  ionViewDidLoad() {
     // this.radioService.getAlbumArt('');
    this.apiServices.getPostData()
    if(this.radioService.isLivePlaying){
      this.radioService.applyCSS()
    }
  }

  getImageUrl(url_) {
    if(url_){
      //console.log(url_);
      let ret = this._sanitizer.bypassSecurityTrustStyle("url(" + url_ + ")");
      // console.log(ret);
      return ret;
    }

  }

  getSliderPhoto() {
    this.service.getSlider().then((results: any) => {
      let data = results;
      let e = [];
      let i= 0;
      var flag = true;

      data.posts.forEach(a => {
        if(flag){
        a.attachments.forEach(b => {
          e.push({url: b.url, title: b.title,content:a.content})
        })
        i++;
      }
      if(i == 5) {
        flag =false;
        return;
      }
      })
      
      console.log(e);
      this.sliderPhoto = e;
      console.log(results);
    });
  }

  openFeatured() {
    this.navCtrl.push(NewsPage, {items: "home"})
  }


  openModelPost(post, item) {
    console.log(item)
    this.navCtrl.push(ShowModelPage, {post: post, item:item});
    // let customModal = this.modalCtrl.create(ShowModelPage, {post: post,item:item});
    // customModal.present();
  }

  changeRegion(value) {
    this.radioService.setRegion(value);
  }




}

