import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export enum ConnectionStatus {
    Online,
    Offline
}


/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

	public status: ConnectionStatus;
  private _status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(null);

  constructor(public network: Network,
              public eventCtrl: Events) {
    console.log('Hello NetworkProvider Provider');
    this.status = this.isConnected()?ConnectionStatus.Online:ConnectionStatus.Offline;
  }

  public initializeNetworkEvents(): void {
    /* OFFLINE */
    this.network.onDisconnect().subscribe(() => {
      if (this.status === ConnectionStatus.Online) {
         this.setStatus(ConnectionStatus.Offline);
      }
    })

    /* ONLINE */
    this.network.onConnect().subscribe(() => {
      if (this.status === ConnectionStatus.Offline) {
        this.setStatus(ConnectionStatus.Online);
      }
    })
  }

  public getNetworkType(): string {
      return this.network.type
  }

  public getNetworkStatus(): Observable<ConnectionStatus> {
      return this._status.asObservable();
  }
  
  public setStatus(status: ConnectionStatus) {
  	if (status != this.status) {
      this.status = status;
      this._status.next(this.status);
  	}
  }

  public isConnected(): boolean {
  	let conntype = this.network.type;
  	return conntype && conntype !== 'unknown' && conntype !== 'none';
  }


}