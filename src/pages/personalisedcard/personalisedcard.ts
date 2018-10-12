import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database' ;
/**
 * Generated class for the PersonalisedcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personalisedcard',
  templateUrl: 'personalisedcard.html',
})
export class PersonalisedcardPage {
  image ;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private db:DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalisedcardPage');

  
  }

  saveImage(){
    var canvas = document.createElement("canvas");
   //var canvas =document.getElementById("mycanvas");

   this. image = new Image();
  // this.imz= canvas.toDataURL("image/png");

 let dataURL = canvas.toDataURL('image/png');
 this.image.src=dataURL

 let outputIMG=document.getElementById('output')
 console.log(dataURL);

 this.db.sendviaWhatsApps(dataURL) ;
    

  }

}
