import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {user} from '../model/user'
import {DatabaseProvider} from '../../providers/database/database' ;
import { ToastController,LoadingController } from 'ionic-angular';
import {HomePage} from '../../pages/home/home'

import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { Network } from '@ionic-native/network';
declare var firebase

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as user ;


  constructor(public navCtrl: NavController, public navParams: NavParams ,private db:DatabaseProvider, public toastCtrl: ToastController,public alertCtrl: AlertController , private network: Network,public loadingCtrl: LoadingController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

    var bt =  <HTMLInputElement>document.getElementById('btSubmit');
    bt.disabled=true ;
  }



  // displayNetworkUpdate(connectionState:string){
  //   let networkType =this.network.type
  //   this.toastCtrl.create({
  //     message:`YOU ARE NOW`+connectionState +'via'+networkType ,
  //     duration:3000 ,
  //   }).present()
   
  //  }
  
  // ionViewDidEnter() {
  //   this.network.onConnect().subscribe(data=>{
  //     console.log(data)
  //     this.displayNetworkUpdate(data.type)
     
  //    }
    
  //   ,error=>console.error(error));
     
  //    this.network.onDisconnect().subscribe(data=>{
     
  //     console.log(data)
  //     this.displayNetworkUpdate(data.type)
  //    },error=>console.error(error));
    
  //   }

  Register(email , pass , name){
    
 console.log(name);
 console.log(email);
 console.log(pass);
 
 
 
    if(email !=""  && pass  !=""  ){
    this.db.register(email ,pass, name ).then(()=>{

       
      const loader = this.loadingCtrl.create({
        content: "Please wait... still connecting ",
        cssClass: "loading-md .loading-wrapper ",
        duration :3000
 
      });
      loader.present();

      
      setTimeout(()=>{
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          title: 'Registered Successfully',
          subTitle: 'Please check your email to verify ',
          buttons: [{
            text: 'OK',
            handler: data => {
              const loader = this.loadingCtrl.create({
                content: "Loading...",
                cssClass: "loading-md .loading-wrapper ",
                duration :3000
              
              });
              loader.present();
             
                this.navCtrl.push(LoginPage)
              
            }
          }]
        });
        alert.present();
  

      } , 3000)
    
   
    name="" ;
    email="" ;
    pass = "" ;
 
    } , (error)=>{
 
 
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle:error.message,
        buttons: ['OK']
      });
      alert.present();
 
 
    })
  }else{
    const alert = this.alertCtrl.create({
      cssClass: "myAlert",
      subTitle:  'Please enter email and password' ,
      buttons: ['OK']
    });
    alert.present();
  }



  }


  getUserName(user){
    var bt =  <HTMLInputElement>document.getElementById('btSubmit');
    if(user != ""){
    console.log(user);
    
      bt.disabled = false;



    }else{
      bt.disabled=true ;
     
      

    }

  }




  google(){
  this.db.SignWithGoogle()

  }
  LoginPage(){
    this.navCtrl.push(LoginPage)
  }

}
