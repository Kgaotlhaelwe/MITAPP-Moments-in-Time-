import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController , ActionSheetController, ToastController,ModalController } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TabsPage } from '../tabs/tabs';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
declare var firebase
import {DatabaseProvider} from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { BackgroundMode } from '@ionic-native/background-mode';
import { EventPage } from '../event/event';
import { Calendar } from '@ionic-native/calendar';
import { ModalmessagePage } from '../modalmessage/modalmessage';
// @IonicPage()
@Component({
  selector: 'page-personalized',
  templateUrl: 'personalized.html',
})
export class PersonalizedPage {
  phoneNumber ;
  peronalisedMsg
  message ;
  chosenDate =this.navParams.get("chosenDate");
  chosenTime =this.navParams.get("chosenTime");
  name = this.navParams.get("name");
  categoryChosen = this.navParams.get("categoryChosen") ;
  date = new Date() ;
  image
  today
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController  , private contacts: Contacts, public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController, private localNotifications: LocalNotifications,private sms:SMS ,private socialSharing:SocialSharing, private db:DatabaseProvider, private backgroundMode: BackgroundMode,private calendar: Calendar,public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    
    console.log('ionViewDidLoad PersonalizedPage');   
    console.log(this.chosenDate);
    console.log(this.chosenTime);
    console.log(this.name);
    console.log(this.categoryChosen);


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
  
  back(){
    this.navCtrl.pop();
  }
  

 

  
  schedule(){

    
    let date = moment(this.chosenDate + " " + this.chosenTime).format('MMMM DD YYYY, h:mm:ss a');
   
    this.backgroundMode.enable();
    
   this.localNotifications.schedule({
     title:this.name ,
     text: this.categoryChosen,
     icon: "../../assets/icon/splashM.png" ,
     trigger: {at: new Date(new Date(date) )} ,
   })
   
   this.today =new Date(this.chosenDate.toString())
   let options = { firstReminderMinutes: 15 };

     this.calendar.createEventWithOptions(this.name, '', this.categoryChosen, this.today, this.today, options).then(res => {
      }, err => {
        console.log('err: ', err);
      });
  //  this.calendar.createEvent(this.name,"", "Please go to the MIT app",this.today,this.today ).then(()=>{
  //  })




   this.db.saveSentMessages(this.name ,this.message, this.chosenDate,this.image).then(()=>{} , (error)=>{})
  
    const modal = this.modalCtrl.create(ModalmessagePage);
    modal.present();
  }

  }

//   ngAfterViewInit() {
//     let tabs = document.querySelectorAll('.show-tabbar');
//     if (tabs !== null) {
//         Object.keys(tabs).map((key) => {
//             tabs[key].style.display = 'none';
//         });
//     }
//   }

//   ionViewWillLeave() {
//   let tabs = document.querySelectorAll('.show-tabbar');
//   if (tabs !== null) {
//       Object.keys(tabs).map((key) => {
//           tabs[key].style.display = 'flex';
//       });

//   }
// }


