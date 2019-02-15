import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, IonicApp } from 'ionic-angular';
import { EventPage } from '../event/event';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';

/**
 * Generated class for the ModalmessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-modalmessage',
  templateUrl: 'modalmessage.html',
})
export class ModalmessagePage {

  showbtn ;

  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App, public viewCtrl :ViewController,public ionicApp: IonicApp, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalmessagePage' + 
    this.navCtrl.length());
  }
  poptoevent(){
 

this.showbtn = true ;
document.getElementById("hidebtn").style.display="none"
   

}



viewScheduled(){
  this.navCtrl.push(AboutPage) ;

}

CreateScheduled(){
  this.navCtrl.push(EventPage) ;
}



}
