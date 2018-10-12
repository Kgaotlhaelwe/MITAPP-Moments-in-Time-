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
  name =this.navParams.get('name');;


  automessage=this.navParams.get('automessage');
  date = this.navParams.get("date");
  time = new Date() ;

 

  countDownDate = this.navParams.get('countDownDate') ;
     
     
  chosenCategory = this.navParams.get("chosenCategory");
  image ;

  cat ;
  
icon
 
users

  constructor(public navCtrl: NavController, public navParams: NavParams,private contacts: Contacts, public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController, private localNotifications: LocalNotifications,private sms:SMS ,private socialSharing:SocialSharing, private db:DatabaseProvider,public modalCtrl: ModalController) {
    console.log(this.icon);
    
    console.log(this.automessage);

   this.cat = moment(this.time).format('MMM Do YYYY,');

    console.log(this.cat);
    
    
  this.sentMessages=[];
  
  this. users= firebase.auth().currentUser;
 
  firebase.database().ref("messagesent/"+this.users.uid).on('value', (data: any) => {
  var name = data.val();
  
    
    if (name !== null) {
     
      
      var keys: any = Object.keys(name);

      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
  
        let  obj = {
         message: name[k].message,
          name: name[k].name,
          key: k ,
          icon:this.icon,
          date:name[k].date,
          image:name[k].image 
         
          }
        this.sentMessages.push(obj);
     
        console.log(this.sentMessages);
        //this.sentMessages=[];
      };
    } else{

      const alert = this.alertCtrl.create({
            // title: 'Confirmation',
            subTitle: 'YOU DONT HAVE MESSAGES SCHEDULED',
            buttons: ['OK']
          });
          alert.present();
      // alert("YOU DONT HAVE MESSAGES SCHEDULED")
    }
    
   


})



  }
  

  ionViewDidLoad() {
    // var x = setInterval(()=> {
    //   this.countDownDate = new Date(this.date).getTime();
    //  // Get todays date and time
    //  var now = new Date().getTime();
    
    //  // Find the distance between now and the count down date
    //  var distance = this.countDownDate - now;
    
    //  // Time calculations for days, hours, minutes and seconds
    //  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    //  // Display the result in the element with id="demo"
    //  this.countDownDate = days + "d " + hours + "h "
    //  + minutes + "m " + seconds + "s ";
    // console.log(this.countDownDate);
    
    
    // }, 10000);

    console.log(this.date);
    console.log(this.chosenCategory);
    console.log(this.countDownDate);
    
    
    

    // if("Birthday" ==this.chosenCategory){
    //   this.cat="B";
    //   document.getElementById("avatar").style.backgroundColor="yellow" ;

    // }
//       var countDownDate = new Date(this.date).getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//     // Get todays date and time
//     var now = new Date().getTime();
    
//     // Find the distance between now and the count down date
//     var distance = countDownDate - now;
    
//     // Time calculations for days, hours, minutes and seconds
//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//     // Output the result in an element with id="demo"
//    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//     + minutes + "m " + seconds + "s ";

//     this.countDown =days + "d " + hours + "h "
//     + minutes + "m " + seconds + "s ";
//     console.log(this.countDown);
    
    
//     // If the count down is over, write some text 
//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("demo").innerHTML = "EXPIRED";
//         this.countDown =days + "d " + hours + "h "
//     + minutes + "m " + seconds + "s ";

    
//     }
// }, 1000);



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
else if("Wedding" == this.chosenCategory ){
  this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";

}
else if("Thinking of you" == this.chosenCategory ){
  this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";

}
else if("General" == this.chosenCategory ){
  this.image = "../../assets/icon/icons8_People_100px.png";

}
  }
  


  Delete(key){
    var users= firebase.auth().currentUser;
    var userid=users.uid
    
    this.sentMessages = [];
    firebase.database().ref('messagesent/'+userid).child(key).remove();
  }
 
  
  contactss(message){
    this.contacts.pickContact().then((data:any)=>{
    console.log(data);
 
     this.phoneNumber=(data.phoneNumbers[0].value);
      this.name=(data.displayName);
   } , (error)=>{
     alert(error)
   })

   setTimeout(()=>{ this.showConfirm(message) }, 10000);
  }
  sendviaWhatsApp(message){
    this.socialSharing.canShareVia(message, null , message).then((data)=>{
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
      this.icon="checkmark-circle";
      
    } , 
    
    
    
    (error)=>{

    })

  }

  sendVia(message, key) {


    const actionSheet = this.actionSheetCtrl.create({
      title: 'CHOOSE',
      buttons: [
        {
          text: 'SMS',
          role: 'destructive',
          handler: () => {
            this.contactss(message);
 
            this.db.sentMessage(message, this.cat, this.name).then(()=>{})
            //var users= firebase.auth().currentUser;
            //var userid=users.uid
 
           this.sentMessages = [];
           firebase.database().ref('messagesent/'+this.users.id).child(key).remove();
 
 
          }
        },
        {
          text: 'Email',
          role: 'destructive',
          handler: () => {
            this.db.sendViaemail(message ).then(()=>{

              this.db.sentMessage(message, this.cat, this.name).then(()=>{})
              var users= firebase.auth().currentUser;
              var userid=users.uid
   
             this.sentMessages = [];
             firebase.database().ref('messagesent/'+userid).child(key).remove();

             alert("sucess")
            }
            
            , (error)=>{

            });
 
           
 
          }
        },
 
        {
          text: 'WhatsAPP',
          handler: () => {
 
         //this.db.sendviaWhatsApp(message ).then;
         this.db.sendviaWhatsApps(message).then(()=>{
          // console.log(this.dates);
          alert(this.name)
         this.db.sentMessage(message, this.cat, this.name).then(()=>{
          
         
         })
         firebase.database().ref('messagesent/'+this.users.uid).child(key).remove();
          console.log(this.cat);
  
       
        

         }, 
         
         
         (error)=>{


         })
 
        
 
 
          }
        },{
          text: 'Facebook',
          role: 'cancel',
          handler: () => {
           this.db.sendviaFacebook(message, message).then(()=>{
            //this.db.sentMessage(message, this.name , this.dates).then(()=>{})
            var users= firebase.auth().currentUser;
            var userid=users.uid
  
             
           firebase.database().ref('messagesent/'+userid).child(key).remove();
           } , 
           
           (error)=>{}) ;
 
           
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

  showConfirm(a) {
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
 
 
 
        // alert(a)
            this.sms.send(this.phoneNumber, a).then(()=>{
                          alert('success')
                          this.icon="checkmark-circle";
                        } , (error)=>{
                          alert(error)
 
                       })
 
 
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

  readMore(message){
    this.navCtrl.push(ViewPage ,{message:message} )

  }
}
