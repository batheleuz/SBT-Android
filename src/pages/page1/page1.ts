import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/Auth';
import { BgTracker } from '../../providers/bg-tracker';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page1',
  templateUrl: 'page1.html'
})
export class Page1{

  nav :any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,
    public locationTracker: BgTracker, public storage: Storage  ) {
    this.nav = navCtrl;

    this.storage.get('id_bus').then((value) => {
       this.locationTracker.idBus = value ;
    });
    this.storage.get('ligne').then((value) => {
       this.locationTracker.ligne = value ;
    });
    this.storage.get('entreprise').then((value) => {
       this.locationTracker.entreprise = value ;
    });
  }

  start(){

    this.locationTracker.startTracking();

  }

  stop(){

    this.locationTracker.lat= 0 ;
    this.locationTracker.lng= 0 ;
    this.locationTracker.vit= 0 ;
    this.locationTracker.stopTracking();
  }

}
/***

import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Todos } from '../../providers/todos';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  loading: any;

  constructor(public navCtrl: NavController, public todoService: Todos, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }
 */
