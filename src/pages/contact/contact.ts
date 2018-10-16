import { Component } from '@angular/core';
import { NavController,AlertController, ModalController } from 'ionic-angular';
import { ViewPage } from '../view/view';
import { InfosentPage } from '../infosent/infosent';

declare var firebase


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  sentMessages = []
  notsend ;

  constructor(public navCtrl: NavController , private alertCtrl :AlertController,public modalCtrl: ModalController) {
    this.sentMessages=[];

    var users= firebase.auth().currentUser;
    console.log(users.uid);
    firebase.database().ref("sentMessages/"+users.uid).on('value', (data: any) => {
    var name = data.val();
   
   
      if (name !== null) {
   
   
        var keys: any = Object.keys(name);
   
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
   
          let  obj = {
           message: name[k].message,
            name: name[k].name,
            key: k ,
   
            date:name[k].date
   
            }
          this.sentMessages.push(obj);
   
          console.log(this.sentMessages);
         
        };
      } else{

        document.getElementById("notsent").innerHTML="You do not have sent messages currently"
      }

   
   
   })
  }
  readMore(message){
    this.navCtrl.push(ViewPage ,{message:message} )

  }
  presentModal() {
    const modal = this.modalCtrl.create(InfosentPage);
    modal.present();
  }
  }

