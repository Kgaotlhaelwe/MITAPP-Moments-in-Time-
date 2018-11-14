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
      
      this.users= firebase.auth().currentUser;
      this.userid=this.users.uid
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad ViewPage');
      console.log(this.message);
     
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
      
        sendVia() {
      
      
          const actionSheet = this.actionSheetCtrl.create({
            title: 'CHOOSE',
            buttons: [
              {
                text: 'SMS',
                role: 'destructive',
                handler: () => {
                  this.contactss(this.msg, this.name, this.key);

                  
                 this.dates = moment(this.time.toString()).format('MMM Do YYYY,');
                 console.log(this.dates);
                  
                  this.db.creatSentessage(this.name ,this.dates ,this.msg).then(()=>{})
                  this.db.deleteReviewMessage(this.key).then(()=>{})
       
                 
       
       
                }
              },
              {
                text: 'Email',
                role: 'destructive',
                handler: () => {

                  
               
      
      
                this.sendViaemail(this.msg)
      
             
               
                this.dates = moment(this.time.toString()).format('MMM Do YYYY,');
                console.log(this.dates);
                 
                 this.db.creatSentessage(this.name ,this.dates ,this.msg).then(()=>{})
                 this.db.deleteReviewMessage(this.key).then(()=>{})
       
                 
       
                 }
              },
       
              {
                text: 'WhatsApp',
                handler: () => {
      
                 
       
                 this.sendviaWhatsApp(this.msg)
             
                
              
                 this.dates = moment(this.time.toString()).format('MMM Do YYYY,');
                 console.log(this.dates);
                  
                  this.db.creatSentessage(this.name ,this.dates ,this.msg).then(()=>{})
                  console.log(this.key);
                  
                  this.db.deleteReviewMessage(this.key).then(()=>{})
        
             
              
      
       
       
              
             
                }
              },{
                text: 'Facebook',
                role: 'cancel',
                handler: () => {
                
                  this.sendviaFacebook(this.message)
                  this.dates = moment(this.time.toString()).format('MMM Do YYYY,');
                  console.log(this.dates);
                   
                   this.db.creatSentessage(this.name ,this.dates ,this.msg).then(()=>{})
                   this.db.deleteSentMessage(this.key).then(()=>{
       
                   })
                
                }
      
                
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
      
            
          this.db.Testing(message ,name,this.dates)
          
          // alert("out");
          // firebase.database().ref('messagesent/'+this.users.uid).child(key).remove();
          
          firebase.database().ref('messagesent/'+this.users.uid).child(key).remove();
      
          // alert("in");
          
      
          
                
       
      
       }
              }
            ]
          });
          confirm.present();
       
        }



   update(){


    
    
    
    this.db.updateReviewMessage(this.msg ,this.message.id).then(()=>{
      
    })
        }     

      }
