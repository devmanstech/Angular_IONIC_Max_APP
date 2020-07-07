import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-competition',
  templateUrl: 'competition.html'
})
export class CompetitionPage {
  url : any;
  itsLoading = false
  constructor(sanitize: DomSanitizer) { 
      this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/competition-terms");
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
