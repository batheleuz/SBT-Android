import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController } from 'ionic-angular';
import {Http} from "@angular/http" ;
import {Page1 } from '../page1/page1';
import {Auth} from "../../providers/Auth" ;
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  username: string;
  password: string;
  feedback: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  connexion(){

    this.showLoader();

    let credentials = {
        username: this.username,
        password: this.password
    };

    this.authService.login(credentials).then((result) => {

        this.loading.dismiss();
        this.navCtrl.setRoot(Page1);

    }, (err) => {

        this.loading.dismiss();
        console.log(err);
        this.feedback = err.statusText;
    });

  }

  ionViewDidLoad() {

        this.showLoader();

        //Check if already connected
        this.authService.checkAuthentication().then((res) => {

            this.navCtrl.setRoot(Page1);
            console.log("Already authorized");
            this.loading.dismiss();

        }, (err) => {

            this.loading.dismiss();
            console.log("Not already authorized");
        });

    }

  showLoader(){

        this.loading = this.loadingCtrl.create({
            content: 'Authentification...'
        });

        this.loading.present();
    }


}


/**
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup-page/signup-page';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {

    email: string;
    password: string;
    loading: any;

    constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {

    }

    ionViewDidLoad() {

        this.showLoader();

        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });

    }

    login(){

        this.showLoader();

        let credentials = {
            email: this.email,
            password: this.password
        };

        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            console.log(result);
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });

    }

    launchSignup(){
        this.navCtrl.push(SignupPage);
    }

    showLoader(){

        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();

    }

}

  */
