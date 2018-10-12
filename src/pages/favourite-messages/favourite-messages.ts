import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database' ;

declare var firebase

@IonicPage()
@Component({
  selector: 'page-favourite-messages',
  templateUrl: 'favourite-messages.html',
})
export class FavouriteMessagesPage {
  favouriteArray = [];

  constructor(public navCtrl: NavController, public navParams: NavParams ,  private db:DatabaseProvider,public alertCtrl: AlertController) {
    // this.db.getFavourite().then((data:any)=>{
    //   console.log(data);
    //   this.favouriteArray.push(data)
    // }, (error)=>{
     
      
    // })



    var users= firebase.auth().currentUser;
 var userid=users.uid
 console.log(userid);
 firebase.database().ref("likedPictures/"+userid).on('value', (data: any) => {
 var name = data.val();
   if (name !== null) {
     var keys: any = Object.keys(name);
     for (var i = 0; i < keys.length; i++) {
       var k = keys[i];
       let  obj = {
         k:keys ,
         message:name[k].message,
         }
       this.favouriteArray.push(obj);
       console.log(this.favouriteArray);
     };
   } else{
     const alert = this.alertCtrl.create({
       title: 'Confirmation',
       subTitle: 'YOUR DONT HAVE FAVOURITE CURRENTLY',
       buttons: ['OK']
     });
     alert.present();
   }
})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouriteMessagesPage');
    console.log(this.favouriteArray);
    
  }

}
