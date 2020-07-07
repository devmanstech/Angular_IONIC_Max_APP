import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-providefeedback',
  templateUrl: 'providefeedback.html'
})
export class ProvideFeedbackPage {
  url : any;
  itsLoading = false
  constructor( sanitize: DomSanitizer) { 
      this.url = sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/feedback/");
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

