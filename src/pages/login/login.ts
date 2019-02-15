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

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  

  show = {}
  user = {} as user ;

  constructor(public navCtrl: NavController, public navParams: NavParams , private keyboard: Keyboard, private db:DatabaseProvider ,public alertCtrl: AlertController,public loadingCtrl: LoadingController, private network: Network, public toastCtrl: ToastController) {

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  
     




  Login(email , password){


    if(email != '' && password != ''){
      var btn = <HTMLInputElement>document.getElementById("btnloginz") ;
      btn.disabled=true ;

     var btn = <HTMLInputElement>document.getElementById("btnlogin") 
      this.db.loginx(email , password).then((data)=>{
        if(data.user.emailVerified == true){
          const loader = this.loadingCtrl.create({
                    content: "Loggin...",
                    cssClass: "loading-md .loading-wrapper ",
                    duration :2000
                  
                  });
                  loader.present();
               
                
                
                  setTimeout(() => {
                  
                  
                           this.navCtrl.setRoot(TabsPage);
                         }, 3000);

        }else{
        
          this.db.showAlert("Email Verication" ,"Please Verify your Email")
                  
               

        }
      }).catch((error)=>{
       
          
      this.db.showAlert("" ,error.message) ;
      
      
          })
     
    }else{
      
     
     
    
     
     

      
    }
    

   
   
     

  }

  forgetPassword(){
    const prompt = this.alertCtrl.create({
      title: 'Forget Password',
      //message: "Enter your Email....",
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter your Email....'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          handler: data => {
            console.log('Saved clicked');

            
           ;
            this.db.forgetPassword(data.name).then(()=>{
              
             

              const loader = this.loadingCtrl.create({
                content: "Please wait, still processing",
                cssClass: "loading-md .loading-wrapper ",
                duration :2000
              
              });
              loader.present()

              setTimeout(()=>{
               

                this.db.showAlert("Registered Successfully" ,"We have sent you email to recover password, Please check your Email") ;

              } , 3000)

           
 
 
 
            }).catch((error)=>{
              
            this.db.errorAlert(error.message)


            })
          }
        }
      ]
    });
    prompt.present();
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

  input(){
  console.log("innnnnnnnnnnnnnnnnnnnnnnnn") ;
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  
}