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

  peronalisedMsg = this.navParams.get("peronalisedMsg") ;

  categoryChosen = this.navParams.get("categoryChosen") ;

phoneNumber;
name;
date
time ;
countDownDate;

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,public modalCtrl: ModalController,public alertCtrl: AlertController ,private sms: SMS , private socialSharing: SocialSharing,private contacts: Contacts) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    console.log(this.graduationMsg);

    console.log(this.peronalisedMsg);
    console.log(this.categoryChosen);
    
    
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
    // this.countDown= moment(this.date).fromNow();
    console.log(today);
    console.log(this.date);
    console.log(this.countDownDate);
 
 if( this.date == undefined){
  
  const alert = this.alertCtrl.create({
    title: 'Alert',
    subTitle: "You need to set date and time",
    buttons: ['OK']
  });
  alert.present();
 }
else if (this.date < today){
  const alert = this.alertCtrl.create({
    title: 'Alert',
    subTitle: "wrong date",
    buttons: ['OK']
  });
  alert.present();
}

else{
  this.message() ;}

 
  var x = setInterval(()=> {
     this.countDownDate = new Date(this.date).getTime();
    // Get todays date and time
    var now = new Date().getTime();
   
    // Find the distance between now and the count down date
    var distance = this.countDownDate - now;
   
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
   
    // Display the result in the element with id="demo"
    this.countDownDate = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
   console.log(this.countDownDate);
   
   
   }, 10000);
    }
  
  message() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose message type',
      buttons: [
        {
          text: 'Personalize Message',
          handler: () => {
           
            this.navCtrl.push(PersonalizedPage ,{chosenDate:this.date , chosenTime:this.time, name:this.name ,categoryChosen:this.categoryChosen, countDownDate:this.countDownDate}) ;
          }
        },{
          text: 'Automated Message',
          handler: () => {
          
            this.navCtrl.push(AutomatePage , {graduation:this.graduationMsg, chosenDate:this.date , chosenTime:this.time, name:this.name ,categoryChosen:this.categoryChosen,  countDownDate:this.countDownDate})
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

back(){
  this.navCtrl.push(EventPage)
}

ngAfterViewInit() {
  let tabs = document.querySelectorAll('.show-tabbar');
  if (tabs !== null) {
      Object.keys(tabs).map((key) => {
          tabs[key].style.display = 'none';
      });
  }
}
ionViewWillLeave() {
  let tabs = document.querySelectorAll('.show-tabbar');
  if (tabs !== null) {
      Object.keys(tabs).map((key) => {
          tabs[key].style.display = 'flex';
      });

  }
}


  
}
