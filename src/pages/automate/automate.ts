import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Tabs,ModalController,ViewController } from 'ionic-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SMS } from '@ionic-native/sms';
import { Contacts } from '@ionic-native/contacts';
import * as moment from 'moment';
import { AboutPage } from '../about/about';
import { DatabaseProvider } from '../../providers/database/database';
import { TabsPage } from '../tabs/tabs';
import { EventPage } from '../event/event';
import { Calendar } from '@ionic-native/calendar';
import { ToastController } from 'ionic-angular';
import { ModalmessagePage } from '../modalmessage/modalmessage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MessagePage } from '../message/message';

/**
 * Generated class for the AutomatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-automate',
  templateUrl: 'automate.html',
})
export class AutomatePage {

@ViewChild('baseTabs') tabsRef : Tabs;
  phoneNumber ;
  peronalisedMsg
  autoMsgArray = this.navParams.get("autoMsgArray")

  message ;
  today

  date = new Date() ;
  countDownDate = this.navParams.get("countDownDate")

  chosenDate =this.navParams.get("chosenDate");
  chosenTime =this.navParams.get("chosenTime");
  name = this.navParams.get("name");
  categoryChosen = this.navParams.get("categoryChosen") ;

  image ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController, private localNotifications: LocalNotifications,private sms:SMS, private contacts: Contacts, private db:DatabaseProvider, private calendar:Calendar,public toastCtrl: ToastController,public modalCtrl: ModalController, public viewCtrl: ViewController ) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutomatePage');

   

    
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

  contactss(){
    this.contacts.pickContact().then((data:any)=>{
    console.log(data);
 
     this.phoneNumber=(data.phoneNumbers[0].value);
   this.name=(data.displayName);
   } , (error)=>{
     alert(error)
   })
  }


  autoMessagessssss(message){

   console.log(message);

  
   
   let obj = {message:message}

   arry.push(obj)

   console.log(arry);

   this.navCtrl.popTo(MessagePage)

   

 
}
   


  


    showConfirm() {
      const confirm = this.alertCtrl.create({
        title: this.name,
        cssClass: "myAlert",
        message: this.phoneNumber,
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Schedule',
            handler: () => {
              console.log(this.phoneNumber);
           
              this.sms.send(this.phoneNumber, this.message).then(()=>{
                
                            // alert('success')
                            
                          } , (error)=>{
                            alert(error)
              
                         }) 
   
   
            }
          }
        ]
      });
      confirm.present();

      
      
    }
    back(){
      this.navCtrl.pop();
    }

    // ngAfterViewInit() {
    //   let tabs = document.querySelectorAll('.show-tabbar');
    //   if (tabs !== null) {
    //       Object.keys(tabs).map((key) => {
    //           tabs[key].style.display = 'none';
    //       });
    //   }
    // }
  

  
}



var arry = [] ;

export default arry ;


