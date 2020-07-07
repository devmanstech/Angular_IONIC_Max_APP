import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html'
})
export class PrivacyPage {
  url : any;
  itsLoading = false
  constructor( sanitize: DomSanitizer) { 
      this.url = sanitize.bypassSecurityTrustResourceUrl("https://max1023.fm/privacy-policy");
      this.itsLoading = true
  }

  isViewLoaded = false
  ionViewDidLoad(){
    this.isViewLoaded = true
  }

  setFrameLoaded(event){
    if (this.isViewLoaded) {
      this.itsLoading = false
    }    
  }
}
