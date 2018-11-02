import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, IonicApp } from 'ionic-angular';
import { EventPage } from '../event/event';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ModalmessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalmessage',
  templateUrl: 'modalmessage.html',
})
export class ModalmessagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App, public viewCtrl :ViewController,public ionicApp: IonicApp) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalmessagePage' + 
    this.navCtrl.length());
  }
  poptoevent(){
   
    this.viewCtrl.dismiss().then(_=>{
  let activePortal = this.ionicApp._modalPortal.getActive()
  if (activePortal) {
    activePortal.dismiss(); //can use another .then here
  }
});
  }
}
