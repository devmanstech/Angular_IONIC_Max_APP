import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-contactPRPage',
  templateUrl: 'contactPR.html'
})
export class ContactPRPage {
  url : any;
  itsLoading = false
  constructor(public sanitize: DomSanitizer) { 
      this.url = sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/contact/");
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

