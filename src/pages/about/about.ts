import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController , ActionSheetController, ModalController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TabsPage } from '../tabs/tabs';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
declare var firebase
import {DatabaseProvider} from '../../providers/database/database';
import { InfoPage } from '../info/info';
import { ViewPage } from '../view/view';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  sentMessages = new Array();
  phoneNumber ;
  peronalisedMsg
  message ;
  image ;
  dates ;
  icon;
  users;
  time = new Date() ;

  name =this.navParams.get('name');
  automessage=this.navParams.get('automessage');
  date = this.navParams.get("date");
  // countDownDate = this.navParams.get('countDownDate') ;     
  chosenCategory = this.navParams.get("chosenCategory");
  hasMessages : boolean = false;

  obj

  constructor(public navCtrl: NavController, public navParams: NavParams,private contacts: Contacts, public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController, private localNotifications: LocalNotifications,private sms:SMS ,private socialSharing:SocialSharing, private db:DatabaseProvider,public modalCtrl: ModalController) {
//     console.log(this.icon);
    
//     console.log(this.automessage);

    this.dates = moment(this.time).format('MMM Do YYYY,');

//     console.log(this.cat);
    
    
//   this.sentMessages=[];
  
//   this. users= firebase.auth().currentUser;
 
//   firebase.database().ref("messagesent/"+this.users.uid).on('value', (data: any) => {
//   var name = data.val();
  
    
//     if (name !== null) {
     
      
//       var keys: any = Object.keys(name);

//       for (var i = 0; i < keys.length; i++) {
//         var k = keys[i];
  
//         let  obj = {
//          message: name[k].message,
//           name: name[k].name,
//           key: k ,
//           icon:this.icon,
//           date:name[k].date,
//           image:name[k].image 
         
//           }
//         this.sentMessages.push(obj);
     
//         console.log(this.sentMessages);
       
//       };

//       if(this.sentMessages.length > 0){
//         this.hasMessages = true;
//       }
//     } else{
//         this.hasMessages =  false;
//     }
  
// })
  }
  ionViewDidLoad() {
    console.log(this.date);
    console.log(this.chosenCategory);
    // console.log(this.countDownDate);
    if("Birthday" == this.chosenCategory){
      this.image ="../../assets/icon/icons8_Wedding_Cake_100px.png";
    }
    else if("Graduation"== this.chosenCategory ){
      this.image ="../../assets/icon/icons8_Graduation_Cap_100px.png" ;
    }else if("Baby Shower" == this.chosenCategory ){
      this.image = "../../assets/icon/icons8_Pram_100px.png";
    }
    else if("New Job" == this.chosenCategory ){
      this.image = "../../assets/icon/icons8_Briefcase_100px.png";
    }
    else if("Anniversary" == this.chosenCategory ){
      this.image ="../../assets/icon/icons8_Wedding_Gift_96px.png";
    }
    else if("Weddings" == this.chosenCategory ){
      this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";
    }
    else if("Thinking of you" == this.chosenCategory ){
      this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";
    }
    else if("General" == this.chosenCategory ){
      this.image = "../../assets/icon/icons8_People_100px.png";
    }
  
}
ionViewWillEnter(){
  console.log(this.icon);
  console.log(this.automessage);
  this.dates = moment(this.time).format('MMM Do YYYY,');
  console.log(this.dates);
  this.sentMessages=[];
  this. users= firebase.auth().currentUser;
firebase.database().ref("messagesent/"+this.users.uid).on('value', (data: any) => {
var name = data.val();
this.sentMessages=[];

if (name !== null) {
  var keys: any = Object.keys(name);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    this.obj = {
      message: name[k].message,
      name: name[k].name,
      key: k ,
      icon:this.icon,
      date:name[k].date,
      image:name[k].image
    }
    this.sentMessages.push(this.obj);
    console.log(this.sentMessages);
  };
  if(this.sentMessages.length > 0){
    this.hasMessages = true;
  }
}
else{
  this.hasMessages =  false;
}
})
}


  Delete(key){
    var users= firebase.auth().currentUser;
    var userid=users.uid
    
    this.sentMessages = [];
    firebase.database().ref('messagesent/'+userid).child(key).remove();
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

  sendVia(message,name , key) {


    const actionSheet = this.actionSheetCtrl.create({
      title: 'CHOOSE',
      buttons: [
        {
          text: 'SMS',
          role: 'destructive',
          handler: () => {
            this.contactss(message, name, key);
 
           
 
 
          }
        },
        {
          text: 'Email',
          role: 'destructive',
          handler: () => {
         


          this.sendViaemail(message)

       
          this.db.Testing(message ,name,this.dates)
          console.log(message);
          
          firebase.database().ref('messagesent/'+this.users.uid).child(key).remove();
 
           
 
           }
        },
 
        {
          text: 'WhatsApp',
          handler: () => {

           
 
           this.sendviaWhatsApp(message)
          // this.sentMessages=[];
          
            this.db.Testing(message ,name,this.dates)
            //this.sentMessages=[];
            firebase.database().ref('messagesent/'+this.users.uid).child(key).remove();
           // this.sentMessages=[];
        
        
       
  
       
        

 
 
        
       
          }
        },{
          text: 'Facebook',
          role: 'cancel',
          handler: () => {
          //  this.db.sendviaFacebook(message, message).then(()=>{
          //   //this.db.sentMessage(message, this.name , this.dates).then(()=>{})
          //   var users= firebase.auth().currentUser;
          //   var userid=users.uid
  
             
          //  firebase.database().ref('messagesent/'+userid).child(key).remove();
          //  } , 
           
          //  (error)=>{}) ;
          this.sendviaFacebook(message)
          this.db.Testing(message ,this.obj.name,this.dates)
           firebase.database().ref('messagesent/'+this.users.uid).child(key).remove();
          
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
  presentModal() {
    const modal = this.modalCtrl.create(InfoPage);
    modal.present();
  }

  readMore(msg, name , image){

    let obj = {
      message:msg ,
      name:name ,
      image:image

    }
    this.navCtrl.push(ViewPage ,{message:obj} )

  }
}
