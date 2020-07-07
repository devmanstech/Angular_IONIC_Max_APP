import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-opinionLagos',
  templateUrl: 'opinionLagos.html'
})
export class OpinionLagosPage {

  url : any;
  itsLoading = true
  
  constructor(
  	public sanitize: DomSanitizer) { 
    
    this.url = this.sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/lagos");
    
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
