import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-opinions',
  templateUrl: 'opinionAbuja.html'
})
export class OpinionAbujaPage {
  url : any;
  itsLoading = false

  constructor(
  	public sanitize: DomSanitizer) { 

    this.url = sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/abuja");
    
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
