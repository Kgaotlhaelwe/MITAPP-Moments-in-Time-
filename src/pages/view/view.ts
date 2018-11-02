import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

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
    console.log('ionViewDidLoad ViewPage');
    console.log(this.message);
   
  }

}
