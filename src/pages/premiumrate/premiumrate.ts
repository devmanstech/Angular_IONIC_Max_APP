import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-premiumrate',
  templateUrl: 'premiumrate.html'
})
export class PremiumRatePage {
  url : any;
  itsLoading = false
  constructor( sanitize: DomSanitizer) { 
      this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/premium-rate");
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
