import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,App, LoadingController, Keyboard } from 'ionic-angular';
import {user} from '../model/user';
import {DatabaseProvider} from '../../providers/database/database' ;
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { MessagePage } from '../message/message';
import { EventPage } from '../event/event';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
declare var firebase
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  

  user = {} as user ;

  constructor(public navCtrl: NavController, public navParams: NavParams , private keyboard: Keyboard, private db:DatabaseProvider ,public alertCtrl: AlertController,public loadingCtrl: LoadingController, private network: Network, public toastCtrl: ToastController) {

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  // displayNetworkUpdate(connectionState:string){
  //   let networkType =this.network.type
  //   this.toastCtrl.create({
  //     message:`You are now `+' '+connectionState  ,
  //     duration:3000 ,
  //   }).present()
   
  //  }
  
  // ionViewDidEnter() {
  //   this.network.onConnect().subscribe(data=>{
  //     console.log(data)
  //     this.displayNetworkUpdate('Connected')
     
  //    }
    
  //   ,error=>console.error(error));
     
  //    this.network.onDisconnect().subscribe(data=>{
     
  //     console.log(data)
  //     this.displayNetworkUpdate('Disconnected')
  //    },error=>console.error(error));
    
  //   }

  Login(user:user){

    
   
    if(user.email !=undefined && user.password !=undefined){
      this.db.login(user.email ,user.password).then(()=>{
        var users= firebase.auth().currentUser;
        console.log(users.uid);      
        // let loading = this.loadingCtrl.create({
        //   spinner: 'ios',
        //   content: 'Logging in please wait...',
        //   cssClass: "loading-md .loading-wrapper ",
        //   duration: 3000
        // });
    
        // loading.present();
      
        this.navCtrl.setRoot(TabsPage);
       
      } ,(error)=>{
        const alert = this.alertCtrl.create({
          // title: 'Error!',
          subTitle:  error.message,
          buttons: ['OK']
        });
        alert.present();
       
      
  
      })
    }else{
      const alert = this.alertCtrl.create({
        subTitle: 'Please enter all details',
        buttons: ['OK']
      });
      alert.present();

    }
  }
  

  // presentLoading1() {
  //   const loader = this.loadingCtrl.create({
  //     content: "Please wait...",
  //     duration: 3000
  //   });
  //   loader.present();
  // }


  forgetPassword(user:user){
    this.db.forgetPassword(user.email).then(()=>{

      const alert = this.alertCtrl.create({
        subTitle:  "Please check your Email",
        buttons: ['OK']
      });
      alert.present();
      
    } , (error)=>{

      const alert = this.alertCtrl.create({
        subTitle:  "Please fill in the email field. ",
        buttons: ['OK']
      });
      alert.present();

    })
  }
  message=function(){
    this.navCtrl.push(MessagePage)
    
  }

  tabs(){
    this.navCtrl.push(TabsPage)
  }
  logInWithFaceBook(){
    this.db.logInWithFaceBook();
  }

  loginwithGooogle(){
    this.db.SignWithGoogle().then(()=>{
      this.navCtrl.push(TabsPage)
    });
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}