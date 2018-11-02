import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,ModalController,AlertController  } from 'ionic-angular';
import { AutomatePage } from '../automate/automate';
import { PersonalizedPage } from '../personalized/personalized';
import { AdminPage } from '../admin/admin';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TabsPage } from '../tabs/tabs';
import { EventPage } from '../event/event';
import *as moment from 'moment'

import { LocalNotifications } from '@ionic-native/local-notifications';
import { Calendar } from '@ionic-native/calendar';
import { BackgroundMode } from '@ionic-native/background-mode';
import {DatabaseProvider} from '../../providers/database/database';
import arry from '../automate/automate'
import { ModalmessagePage } from '../modalmessage/modalmessage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  graduationMsg = this.navParams.get("graduationMsg");
  weddingMsg = this.navParams.get("weddingMsg");
  newJobMsg = this.navParams.get("newJobMsg");
  birthdayMsg = this.navParams.get("birthdayMsg");
  babyShowerMsg = this.navParams.get("babyShowerMsg");
  anniversaryMsg = this.navParams.get("anniversaryMsg");
  modalMessage = this.navParams.get("modalMessage");
  peronalisedMsg = this.navParams.get("peronalisedMsg") ;

  categoryChosen = this.navParams.get("categoryChosen") ;

phoneNumber;
name =this.navParams.get("name");;
date=this.navParams.get("date");
time =this.navParams.get("time");
countDownDate;
messageType ;
today ;
messagez ;
image ;

messagezz ;
// name1 =this.navParams.get("name1"); ;
date1 ;

messageArry = arry ;
personalisedMessage :boolean =false ;
autoMessage :boolean =false ;
automsg ;
saveMessage ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController ,private sms: SMS , private socialSharing: SocialSharing,private contacts: Contacts,public modalCtrl: ModalController, private localNotifications: LocalNotifications,  private backgroundMode: BackgroundMode,  private db:DatabaseProvider ,private calendar: Calendar) {
  
  
   
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad MessagePage');
    console.log(this.graduationMsg);
    console.log(this.peronalisedMsg);
    console.log(this.categoryChosen);
    console.log(this.modalMessage);
    console.log(this.messageArry);
    
if(this.messageArry.length ==1){
  this.automsg =this.messageArry[0].message
  console.log(this.messageArry);
  
  this.messageArry.splice(0,this.messageArry.length)
}
    


    
    
    
    if(this.messageType =='a'){
      const modal = this.modalCtrl.create(AutomatePage , {graduation:this.graduationMsg, chosenDate:this.date , chosenTime:this.time, name:this.name ,categoryChosen:this.categoryChosen,  countDownDate:this.countDownDate});
      modal.present();

    }



    if("Birthday" == this.categoryChosen){
      this.image ="../../assets/icon/icons8_Wedding_Cake_100px.png";
      console.log(this.image );
      
    }
    else if("Graduations"== this.categoryChosen ){
      this.image ="../../assets/icon/icons8_Graduation_Cap_100px.png" ;
      console.log(this.image );

    }else if("Baby Shower" == this.categoryChosen ){
      this.image = "../../assets/icon/icons8_Pram_100px.png";
      console.log(this.image );

    }
    else if("New Jobs" == this.categoryChosen ){
      this.image = "../../assets/icon/icons8_Briefcase_100px.png";
      console.log(this.image );

    }
    else if("Anniversary" == this.categoryChosen ){
      this.image ="../../assets/icon/icons8_Wedding_Gift_96px.png";
      console.log(this.image );

    }
    else if("Weddings" == this.categoryChosen ){
      this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";
      console.log(this.image );

    }
    else if("Thinking of you" == this.categoryChosen ){
      this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";
      console.log(this.image );

    }
    else if("General" == this.categoryChosen ){
      this.image = "../../assets/icon/icons8_People_100px.png";
      console.log(this.image );

    }
 
  }
  
  
  chooseMessageType(){
    const prompt = this.alertCtrl.create({
      title: 'Message Type',
    
     
      buttons: [
        {
          text: 'Personalised',
          handler: data => {
            console.log('Cancel clicked');

           this.personalisedMessage=true ;

           document.getElementById("btnz").style.display="block" ;
           document.getElementById("btnMessageType").style.display="none"
          }
        },
        {
          text: 'Automated',
          handler: data => {
           
           
            
             this.autoMessage =true ;
            
             document.getElementById("btnz").style.display="block" ;
              document.getElementById("btnMessageType").style.display="none"
              this.navCtrl.push(AutomatePage,{graduation:this.graduationMsg, chosenDate:this.date , chosenTime:this.time, name:this.name ,categoryChosen:this.categoryChosen,  countDownDate:this.countDownDate}) ;
        
            }


          
        }
      ]
    });
    prompt.present();

  }

  chooseDate(){
    

    let d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var today = year + "-" + '0' + month + "-" +  day + "T" + hour +":"+ minute +":"+ second;
  
    console.log(today);
    console.log(this.date);

 
 if( this.date == undefined  ){
  
      const alert = this.alertCtrl.create({

        subTitle: "Please enter all details",
         buttons: ['OK']
  });
  alert.present();

 }

 else if (this.name ==undefined){
  const alert = this.alertCtrl.create({

    subTitle: "Please fill in the name",
     buttons: ['OK']
});
alert.present();

 }
else if (this.date < today){
  const alert = this.alertCtrl.create({
  
    subTitle: "You have selected the previous year, please select current year or greater.",
    buttons: ['OK']
  });
  alert.present();
}

else{
  //this.message() ;}

}
}
  
back(){
  this.navCtrl.pop()
}

// ngAfterViewInit() {
//   let tabs = document.querySelectorAll('.show-tabbar');
//   if (tabs !== null) {
//       Object.keys(tabs).map((key) => {
//           tabs[key].style.display = 'none';
//       });
//   }
// }
// ionViewWillLeave() {
//   let tabs = document.querySelectorAll('.show-tabbar');
//   if (tabs !== null) {
//       Object.keys(tabs).map((key) => {
//           tabs[key].style.display = 'flex';
//       });

//   }
// }


  

schedule(autoMessage , personalisedMessage){

  if(this.name !=undefined && this.time !=undefined && this.date !=undefined){
    if(this.automsg == autoMessage && this.automsg !=undefined ){
      this.saveMessage =autoMessage ;
    }else{
      this.saveMessage =personalisedMessage
  
    }
  
      
    let date = moment(this.date + " " + this.time).format('MMMM DD YYYY, h:mm:ss a');
   
    this.backgroundMode.enable();
    
   this.localNotifications.schedule({
     title:this.name ,
     text: this.categoryChosen,
     icon: "../../assets/icon/splashM.png" ,
     trigger: {at: new Date(new Date(date) )} ,
   })
   
   this.today =new Date(this.date.toString())
   let options = { firstReminderMinutes: 10 };
  
     this.calendar.createEventWithOptions(this.name, 'Go to the MIT App', this.categoryChosen, this.today, this.today, options).then(res => {
      }, err => {
        console.log('err: ', err);
      });
  
  
  
  
  
   this.db.saveSentMessages(this.name ,this.saveMessage, this.date,this.image).then(()=>{} , (error)=>{})
  
   const modal = this.modalCtrl.create(ModalmessagePage);
    modal.present();


  }
  
  
  
  else {
    const alert = this.alertCtrl.create({

      subTitle: "Please enter all details",
       buttons: ['OK']
});
alert.present();
    

  }

  
  


 
}

}


