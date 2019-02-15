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

  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App, public viewCtrl :ViewController,public ionicApp: IonicApp, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalmessagePage' + 
    this.navCtrl.length());
  }
  poptoevent(){
 


   const confirm = this.alertCtrl.create({
    title: 'Choose A Page ',
   // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
    buttons: [
      {
        text: 'HOME',
        handler: () => {
          //this.navCtrl.push(TabsPage);
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(TabsPage).then(() => {
             this.navCtrl.remove(currentIndex);
           });
        }


      },
      {
        text: 'SCHEDULED',
        handler: () => {
          //this.navCtrl.push(AboutPage);
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(AboutPage).then(() => {
             this.navCtrl.remove(currentIndex);
           });
        }
      }
    ]
  });
  confirm.present();


}
}
