import { Component } from '@angular/core';
import { NavController,AlertController, ModalController, NavParams } from 'ionic-angular';
import { ViewPage } from '../view/view';
import { InfosentPage } from '../infosent/infosent';
import { SplashPage } from '../splash/splash';
import { DatabaseProvider } from '../../providers/database/database';

declare var firebase


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  sentMessages = []
  notsend ;
  image ;
  hasMessages : boolean = false;
  chosenCategory = this.navParams.get("chosenCategory");

  constructor(public navCtrl: NavController , public navParams: NavParams,private alertCtrl :AlertController,public modalCtrl: ModalController, private db: DatabaseProvider) {
    if("Birthday" == this.chosenCategory){
      this.image ="../../assets/icon/icons8_Wedding_Cake_100px.png";
    }
    else if("Graduation"== this.chosenCategory ){
      this.image ="../../assets/icon/icons8_Graduation_Cap_100px.png" ;
    }else if("Baby Shower" == this.chosenCategory ){
      this.image = "../../assets/icon/icons8_Pram_100px.png";
    }
    else if("New Job" == this.chosenCategory ){
      this.image = "../../assets/icon/icons8_Briefcase_100px.png";
    }
    else if("Anniversary" == this.chosenCategory ){
      this.image ="../../assets/icon/icons8_Wedding_Gift_96px.png";
    }
    else if("Weddings" == this.chosenCategory ){
      this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";
    }
    else if("Thinking of you" == this.chosenCategory ){
      this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";
    }
    else if("General" == this.chosenCategory ){
      this.image = "../../assets/icon/icons8_People_100px.png";
    }
  
  }
  readMore(msg, name ){

    let obj = {
      message:msg ,
      name:name ,
      // image:image
     
}
    this.navCtrl.push(SplashPage ,{message:obj} )

  }

  Delete(key){
    this.db.deleteSentMessage(key).then(()=>{
      this.navCtrl.push(ContactPage)
    })
  }
  
  presentModal() {
    const modal = this.modalCtrl.create(InfosentPage);
    modal.present();
  }

  ionViewWillEnter(){
   

  //   var users= firebase.auth().currentUser;
  //   console.log(users.uid);
  //   firebase.database().ref("Testingmsg/"+users.uid).on('value', (data: any) => {
  //   var name = data.val();
   
  //   this.sentMessages=[];
  //     if (name !== null) {
   
   
  //       var keys: any = Object.keys(name);
   
  //       for (var i = 0; i < keys.length; i++) {
  //         var k = keys[i];
   
  //         let  obj = {
  //          message: name[k].message,
  //           name: name[k].name,
  //           key: k ,
   
  //           date:name[k].date
   
  //           }
  //         this.sentMessages.push(obj);
   
  //         console.log(this.sentMessages);
         
  //       };
  //       if(this.sentMessages.length > 0){
  //         this.hasMessages = true;
  //       }
  //     } else{
  //         this.hasMessages =  false;
  //     }

   
   
  //  })

    this.db.getSentMessage().then((data:any)=>{
    console.log(data);

    this.sentMessages = data ;

    if (this.sentMessages.length > 0) {
      this.hasMessages = true;
    }
    else {
      this.hasMessages = false;
    }

  

})
  
  }

  

  
  }

