import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { NetworkProvider, ConnectionStatus } from '../../providers/network/network';


/**
 * Generated class for the NetworkErrorPage page.
 */
@Component({
  selector: 'page-network-error',
  templateUrl: 'network-error.html',
})
export class NetworkErrorPage {
	unregisterBackButtonAction:any;
  unsubscribeNetworkStatus:any;

  constructor(
  	public platform:Platform, 
  	public viewCtrl: ViewController, 
  	public networkStatus: NetworkProvider) {
  	
    this.unsubscribeNetworkStatus = this.networkStatus.getNetworkStatus().subscribe(this.currentNetworkStatus.bind(this));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkErrorPage');
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
    	// do nothing
    });
  }

  currentNetworkStatus(status){
    console.log('network status ==> ', (status == ConnectionStatus.Offline));
    if (status == ConnectionStatus.Online) {
      this.retry();
    }
  }

  retry(){

  	if(this.networkStatus.isConnected()){
  		if(this.unregisterBackButtonAction){
  			this.unregisterBackButtonAction();
  		}
      if (this.unsubscribeNetworkStatus) {
        this.unsubscribeNetworkStatus.unsubscribe(this.currentNetworkStatus);
      }
      
  		this.viewCtrl.dismiss();
  	}
  }

}
