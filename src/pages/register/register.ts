import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {user} from '../model/user'
import {DatabaseProvider} from '../../providers/database/database' ;
import { ToastController } from 'ionic-angular';
import {HomePage} from '../../pages/home/home'

import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
declare var firebase

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as user ;


  constructor(public navCtrl: NavController, public navParams: NavParams ,private db:DatabaseProvider, public toastCtrl: ToastController,public alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  Register(user:user){
    console.log(user.name);
    
  
    if(this.user.email !=null  && this.user.password  !=null  ){
    this.db.register(user.email ,user.password, user.name,user.image ).then(()=>{
      const toast = this.toastCtrl.create({
        message: 'Thank you. You have been successfully Registered',
        cssClass:'toast3' ,
        duration: 3000,
        position: 'end'
      });
      toast.present();
      this.navCtrl.setRoot(TabsPage);
      
    } , (error)=>{
 
 
      const alert = this.alertCtrl.create({
        subTitle:error.message,
        buttons: ['OK']
      });
      alert.present();
     
 
    })
  }else{
    const alert = this.alertCtrl.create({
      subTitle:  'Please enter email and password' ,
      buttons: ['OK']
    });
    alert.present();
  }
  }


  google(){
  this.db.SignWithGoogle()

  }
  LoginPage(){
    this.navCtrl.push(LoginPage)
  }

}
