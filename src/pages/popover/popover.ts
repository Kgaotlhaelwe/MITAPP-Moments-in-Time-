import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController} from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database' ;
import { LoginPage } from '../login/login';
import { FavouriteMessagesPage } from '../favourite-messages/favourite-messages';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
  
})
export class PopoverPage {

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, private db:DatabaseProvider,public alertCtrl: AlertController) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
    
  }
  signout(){
    this.db.signout();
    const confirm = this.alertCtrl.create({
      title: 'Log out',
      message: 'Do you want log out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    confirm.present();
    this.viewCtrl.dismiss();
  }
  favorite(){
    this.navCtrl.push(FavouriteMessagesPage)
  }
}
