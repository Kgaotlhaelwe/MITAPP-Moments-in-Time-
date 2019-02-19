import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TabsPage } from '../tabs/tabs';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
declare var firebase
import { DatabaseProvider } from '../../providers/database/database';
import { InfoPage } from '../info/info';
import { ViewPage } from '../view/view';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  sentMessages = new Array();
  phoneNumber;
  peronalisedMsg
  message;
  image;
  dates;
  icon;
  users;
  time = new Date();

  name = this.navParams.get('name');
  automessage = this.navParams.get('automessage');
  date = this.navParams.get("date");
  // countDownDate = this.navParams.get('countDownDate') ;     
  chosenCategory = this.navParams.get("chosenCategory");
  hasMessages: boolean = false;

  obj

  schedulefunction = [] ;
  tabs ;




  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private localNotifications: LocalNotifications, private sms: SMS, private socialSharing: SocialSharing, private db: DatabaseProvider, public modalCtrl: ModalController, private network: Network, public toastCtrl: ToastController) {
    // this.db.getReviewMessage().then((data:any)=>{
    //   console.log(data);
    //   this.sentMessages = [] ;
    //   this.sentMessages = data
    //   console.log( this.sentMessages);
      
    //   if(this.sentMessages.length > 0){
    //     this.hasMessages = true;
    //   }
    // })

    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
      });
    }

    this.tabs = this.navParams.get('tabs');

   this.db.getScheduledEmails().then((data:any)=>{
     console.log(data);
     this.sentMessages = data
     console.log( this.sentMessages);

         if(this.sentMessages.length > 0){
        this.hasMessages = true;
      }
    

   })


   this.db.getScheduledFunctionEmails().then((data:any)=>{
     this.schedulefunction =data ;

   })
  }

  ionViewDidLoad() {
    this.db.getScheduledEmails().then((data:any)=>{
      console.log(data);
      this.sentMessages = data
      console.log( this.sentMessages);
 
          if(this.sentMessages.length > 0){
         this.hasMessages = true;
       }
     
 
    })

 
 
    this.db.getScheduledFunctionEmails().then((data:any)=>{
      this.schedulefunction =data ;
 
    })



    console.log(this.date);
    console.log(this.chosenCategory);
    // console.log(this.countDownDate);
    if ("Birthday" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Wedding_Cake_100px.png";
    }
    else if ("Graduation" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Graduation_Cap_100px.png";
    } else if ("Baby Shower" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Pram_100px.png";
    }
    else if ("New Job" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Briefcase_100px.png";
    }
    else if ("Anniversary" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Wedding_Gift_96px.png";
    }
    else if ("Weddings" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";
    }
    else if ("Thinking of you" == this.chosenCategory) {
      this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";
    }
    else if ("General" == this.chosenCategory) {
      this.image = "../../assets/icon/icons8_People_100px.png";
    }




    this.db.getScheduledEmails().then((data:any)=>{
      console.log(data);
      this.sentMessages = [] ;
      this.sentMessages = data
      console.log( this.sentMessages);
      
      if(this.sentMessages.length > 0){
        this.hasMessages = true;
      }
    })

    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
      });
    }

  }

  // ionViewWillLeave() {
  // let tabs = document.querySelectorAll('.show-tabbar');
  // if (tabs !== null) {
  //     Object.keys(tabs).map((key) => {
  //         tabs[key].style.display = 'flex';
  //     });
 
  // }
  // }

  ionViewWillEnter() {
    console.log(this.icon);
    console.log(this.automessage);
    this.dates = moment(this.time).format('MMM Do YYYY,');
    console.log(this.dates);
    this.sentMessages = [];
    this.users = firebase.auth().currentUser;

 this.db.getScheduledEmails().then((data:any)=>{
     console.log(data);
     this.sentMessages = data
     console.log( this.sentMessages);

         if(this.sentMessages.length > 0){
        this.hasMessages = true;
      }
    

   })


   this.db.getScheduledFunctionEmails().then((data:any)=>{
     this.schedulefunction =data ;

   })


    

    

  }


 ionViewDidEnter(){
  this.db.getScheduledEmails().then((data:any)=>{
    console.log(data);
    this.sentMessages = data
    console.log( this.sentMessages);

        if(this.sentMessages.length > 0){
       this.hasMessages = true;
     }
   

  })


  this.db.getScheduledFunctionEmails().then((data:any)=>{
    this.schedulefunction =data ;

  })
 }


  Delete(key, uniquedate) {

    console.log(key);
    

    var users = firebase.auth().currentUser ;
    var userid = users.uid ;
    console.log( users);
    console.log( userid);
    console.log(this,this.schedulefunction)
    
    if(this.sentMessages.length == 1){
      firebase.database().ref('scheduledEmails/'+ userid).child(key).remove().then(()=>{
        for (let index = 0; index < this.schedulefunction.length; index++) {
          if(this.schedulefunction[index].uniquedate ==uniquedate){
            firebase.database().ref("schedulefunctionEmail/").child(this.schedulefunction[index].k).remove() ;
          }
        
          
        }

      });
      console.log("in");
      
      this.sentMessages = [] ;

      this.ionViewDidLoad() ;

    } else {
      firebase.database().ref('scheduledEmails/'+ userid).child(key).remove().then(()=>{
        for (let index = 0; index < this.schedulefunction.length; index++) {
          if(this.schedulefunction[index].uniquedate ==uniquedate){
            firebase.database().ref("schedulefunctionEmail/").child(this.schedulefunction[index].k).remove() ;
          }
        
          
        }

      });

      this.ionViewDidLoad() ;


    }

   
    


  }


  contactss(message, name, key) {
    this.contacts.pickContact().then((data: any) => {
      console.log(data);

      this.phoneNumber = (data.phoneNumbers[0].value);
      this.name = (data.displayName);
    }, (error) => {
      //alert(error)
    })

    setTimeout(() => {
      this.showConfirm(message, name, key)

    }, 3000)




  }
  sendviaWhatsApp(message) {
    this.socialSharing.shareViaWhatsApp(message, null, null).then((data) => {
      console.log(data);
      this.icon = "checkmark-circle";


    }, (error) => {

    })

  }

  sendviaFacebook(message) {
    this.socialSharing.shareViaFacebook(message).then(() => { }, (error) => { })
    this.icon = "checkmark-circle";
  }

  sendViaemail(message) {
    this.socialSharing.shareViaEmail(message, null, null).then(() => {


    },



      (error) => {

      })

  }

  sendVia(message, name, key) {




    const actionSheet = this.actionSheetCtrl.create({
      title: 'CHOOSE',
      buttons: [
        // {
        //   text: 'SMS',
        //   role: 'destructive',
        //   handler: () => {
        //     this.contactss(message, name, key);
        //    // this.db.creatSentessage(name, this.dates, message).then(() => { })
        //    // this.db.deleteSentMessage(key).then(() => {

        //     //})

        //     this.db.sentMessage(name, this.dates, message);
        //     console.log(key);
            
        //    firebase.database().ref('ReviewMessage/'+this.users.uid).child(key).remove();

        //   }
        // },
        {
          text: 'Email',
          role: 'destructive',
          handler: () => {


            this.dates = moment(this.time.toString()).format('MMM Do YYYY,');
            this.sendViaemail(message)
           // this.db.creatSentessage(name, this.dates, message).then(() => { })
           // this.db.deleteReviewMessage(key).then(()=>{})

           this.db.sentMessage(message ,name,this.dates);
           console.log(key);
           
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

  showConfirm(message, name, key) {
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
          text: 'Send',
          handler: () => {




            this.sms.send(this.phoneNumber, message).then(() => {

              this.icon = "checkmark-circle";
            }, (error) => {


            })


          //  this.db.Testing(message, name, this.dates)

            // alert("out");
            // firebase.database().ref('messagesent/'+this.users.uid).child(key).remove();

            firebase.database().ref('messagesent/' + this.users.uid).child(key).remove();

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

  readMore(msg, name) {

    let obj = {
      message: msg,
      name:name
     

    }
    this.navCtrl.push(ViewPage, { message: obj })

  }
  




  // displayNetworkUpdate(connectionState:string){
  //   let networkType =this.network.type
  //   this.toastCtrl.create({
  //     message:connectionState ,
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
  //     this.displayNetworkUpdate('Disconected')
  //    },error=>console.error(error));

  //   }

}