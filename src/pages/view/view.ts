import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , ActionSheetController, ModalController } from 'ionic-angular';

declare var firebase
import {DatabaseProvider} from '../../providers/database/database';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { SMS } from '@ionic-native/sms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
import { AboutPage } from '../about/about';
/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  dummyText: string = "type text";
  random= Math.floor(Math.random() * 6) + 0;
 bigSize = ["url",
                         "url('../../assets/ringbackground.jpg')",
                         "url('../../assets/flowerbackground.jpg')",
                         "url('../../assets/ballonbackground.jpg')",
                         "url('../../assets/backgroun11.jpg')",
                         "url('../../assets/background12.jpg')"];

  message =this.navParams.get("message");
  key ;
  msg ;
  name;
  image;
  userid;
  users;
  icon;
  obj;
  phoneNumber;
  dates;
  time = new Date();


    constructor(public navCtrl: NavController, public navParams: NavParams,private contacts: Contacts, public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController, private localNotifications: LocalNotifications,private sms:SMS ,private socialSharing:SocialSharing, private db:DatabaseProvider,public modalCtrl: ModalController , private network: Network , public toastCtrl: ToastController) {
      this.msg =this.message.message;
      this.name =this.message.name;
      this.image=this.message.image;
      this.key = this.message.id;
      console.log(this.message);
      console.log(this.key);
      
      this.users= firebase.auth().currentUser;
      this.userid=this.users.uid
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad ViewPage');
      console.log(this.message);
      this.randombg()
     
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

        reviewChange(){
          document.getElementById("hidebtn").style.display="block" ;

        }
 

        sendviaWhatsApp(message){
          this.socialSharing.shareViaWhatsApp(message, null , null).then((data)=>{
            console.log(data);
            this.icon="checkmark-circle";
            
       
          } , (error)=>{
       
          })
       
        }
      
        sendviaFacebook(message){
          this.socialSharing.shareViaFacebook(this.message , null , null).then(()=>{} , (error)=>{})
          this.icon="checkmark-circle";
        }
      
        sendViaemail(message){
          this.socialSharing.shareViaEmail(message ,null ,null).then(()=>{
           
            
          } , 
          
          
          
          (error)=>{
      
          })
      
        }
      
        sendVia(message, name, key) {




          const actionSheet = this.actionSheetCtrl.create({
            title: 'CHOOSE',
            buttons: [
              
              {
                text: 'Email',
                role: 'destructive',
                handler: () => {
      
      
                  this.dates = moment(this.time.toString()).format('MMM Do YYYY,');
                  this.sendViaemail(message)

                 console.log(message);
                 console.log(name);
                 console.log(key);
                 
                 
                 
                  this.db.sentMessage(message ,name,this.dates);
              
                 
                firebase.database().ref('ReviewMessage/'+this.users.uid).child(key).remove();
       
                 
      
      
                }
              },
      
              {
                text: 'WhatsApp',
                handler: () => {
      
      
      
                 this.sendviaWhatsApp(message)
      
      
                  this.dates = moment(this.time.toString()).format('MMM Do YYYY,');
                  console.log(this.dates);
      
                  //this.db.creatSentessage(name, this.dates, message).then(() => { })
                 // this.db.deleteReviewMessage(key).then(()=>{})
                 this.db.sentMessage(message ,name,this.dates);
                 console.log(key);
                 
                 firebase.database().ref('ReviewMessage/'+this.users.uid).child(key).remove();
      
                 
       
      
      
      
      
      
      
      
      
      
      
      
                }
              // }, {
              //   text: 'Facebook',
              //   role: 'destructive',
              //   handler: () => {
              //     console.log(message);
                  
              //     this.sendviaFacebook(message)
              
              //     this.dates = moment(this.time.toString()).format('MMM Do YYYY,');
              //     console.log(this.dates);
      
              //    this.db.sentMessage(message ,name,this.dates);
              //    console.log(key);
                 
              //    firebase.database().ref('ReviewMessage/'+this.users.uid).child(key).remove();
       
      
              //   }
      
      
               },
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
      
                }
              }
      
            ]
          });
          actionSheet.present();
      
        }
      

        contactss(message, name, key){
          this.contacts.pickContact().then((data:any)=>{
          console.log(data);
       
           this.phoneNumber=(data.phoneNumbers[0].value);
            this.name=(data.displayName);
         } , (error)=>{
           //alert(error)
         })
      
         setTimeout(()=>{
          this.showConfirm(message, name ,key) 
      
         } , 3000)
      
       
      
         
        }

        showConfirm(message, name , key) {
          const confirm = this.alertCtrl.create({
            cssClass: "myAlert",
            title: this.name,
            message: this.phoneNumber,
            buttons: [
              {
                text: 'Disagree',
                handler: () => {
                  console.log('Disagree clicked');
                }
              },
              {
                text: 'Send',
                handler: () => {
       
       
       
              
                  this.sms.send(this.phoneNumber, message).then(()=>{
                                
                                this.icon="checkmark-circle";
                              } , (error)=>{
                                
       
                             })
      
            
        //  this.db.Testing(message ,name,this.dates)
          
          // alert("out");
          // firebase.database().ref('messagesent/'+this.users.uid).child(key).remove();
          
          firebase.database().ref('messagesent/'+this.users.uid).child(this.key).remove();
      
          // alert("in");
          
      
          
                
       
      
       }
              }
            ]
          });
          confirm.present();
       
        }



   update(){


    
    
    
    // //this.db.updateReviewMessage(this.msg ,this.message.id).then(()=>{0
      
    // })
console.log(this.msg);

    var update ={
      message:this.msg


    }
    console.log(this.users.uid);
    console.log(update);
  
    
   
     firebase.database().ref('ReviewMessage/'+this.users.uid).child(this.key).update(update).then(()=>{
       this.navCtrl.push(AboutPage)

     
    });


        }  
        // randomBackground(){
        //   var random= Math.floor(Math.random() * 6) + 0;
        //   var bigSize = ["url",
        //                  "url('../../assets/2c98d6483f21fc6882ef3b2bac11b522.jpg')",
        //                  "url('../../assets/9ea74a0cd9946a282100bbbeae94d6be.jpg')",
        //                  "url('../../assets/nicepics/Heart Candles Husband Birthday Card.jpg')",
        //                  "url('../../assets/nicepics/Pink and Blue Baby Shower Card.png')",
        //                  "url('../../assets/nicepics/Pink Balloons Illustration Wedding Announcement.png')"];
        //   document.getElementById("random").style.backgroundImage=bigSize[random];


        //   // var imgCount = 3;
        //   // var dir = '../../assets/';
        //   // var randomCount = (Math.floor(Math.random() * imgCount));
        //   // var images = ['2c98d6483f21fc6882ef3b2bac11b522.jpg',
        //   // '2c98d6483f21fc6882ef3b2bac11b522.jpg', 
        //   // '2c98d6483f21fc6882ef3b2bac11b522.jpg'];
        //   // document.getElementById('random').setAttribute('style', "background-image: url(" + dir + images[randomCount] + ");background-repeat: no-repeat;background-size: 388px 388px")

        // }   

        randombg(){
         
          document.getElementById("random").style.backgroundImage=this.bigSize[this.random];
          // document.getElementById("random").style.backgroundColor="red";
          // document.getElementById("random").style.backgroundImage="block" 
       
        }

      }
