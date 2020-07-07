import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-thirdparty',
  templateUrl: 'thirdparty.html'
})
export class ThirdPartyPage {
  url : any;
  itsLoading = false
  constructor(public sanitize: DomSanitizer) { 
    this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/third-party​");
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
