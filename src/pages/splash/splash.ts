import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  message =this.navParams.get("message");
  msg ;
  name;
  image;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.msg =this.message.message;
      this.name =this.message.name;
      this.image=this.message.image;
      
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');

    console.log(this.message);
    
  }


 
}
