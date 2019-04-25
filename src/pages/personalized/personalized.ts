import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController , ActionSheetController, ToastController,ModalController } from 'ionic-angular';
import { MessagePage } from '../message/message';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TabsPage } from '../tabs/tabs';

import * as moment from 'moment';
declare var firebase
import {DatabaseProvider} from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';

import { EventPage } from '../event/event';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController  , private contacts: Contacts, public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController ,private socialSharing:SocialSharing, private db:DatabaseProvider, public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    
    


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
  

 

  
  

  }




