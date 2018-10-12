import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController,PopoverController } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database' ;
import { AutomatePage } from '../automate/automate';
import { MessagePage } from '../message/message';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { Slides } from 'ionic-angular';
import {
 StackConfig,Stack,Card,ThrowEvent,DragEvent,SwingStackComponent,SwingCardComponent} from 'angular2-swing';


 import {EventEmitter } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { LoginPage } from '../login/login';
import { PersonalisedcardPage } from '../personalisedcard/personalisedcard';

@Component({

 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {
 mesaagesArray =[] ;
 msgz =[]
 indx =0
 @ViewChild('myswing1') swingStack: SwingStackComponent;
 @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

 cards: Array<any>;
 stackConfig: StackConfig;
 recentCard: string = '';
 currentIndex :number = 0;
 count =0 ;

 liked = 0
 shareMsg


 imgstring :string ;

 @ViewChild(Slides) slides: Slides;



 ready = false;
 attendants = [];
 cardDirection = "xy";
 cardOverlay: any = {
     like: {
         backgroundColor: '#28e93b'
     },
     dislike: {
         backgroundColor: '#e92828'
     }
 };


 images= [];



 constructor(public navCtrl: NavController , private db:DatabaseProvider, private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController,public popoverCtrl: PopoverController , private sanitizer: DomSanitizer) {
   this.db.getMessages().then((data:any)=>{
     console.log(data);

     this.images=data

     console.log(this.images);

     


     for (let i = 0; i < this.images.length; i++) {
       this.attendants.push({
           id: i + 1,
           likeEvent: new EventEmitter(),
           destroyEvent: new EventEmitter(),
          asBg: sanitizer.bypassSecurityTrustStyle('url('+this.images[i].message+')')


       });

   }

   this.ready = true;



     //this.msgz=this.mesaagesArray[0].message;

   } , (error)=>{})






}


onCardInteract(event) {
 console.log(event);


if(event.like == false){
 this.liked =this.liked+1 ;
}


 if(event.like == true){
   console.log(this.liked);



   this.msgz =this.images[this.liked].message
   this.liked =this.liked+1 ;
   console.log("liked");
   console.log(this.msgz);
   console.log(this.liked);

   this.db.likedMessage(this.msgz).then(()=>{})




 }

 else{
   //console.log(event);
   console.log("disliked");



 }
}



presentPopover(myEvent) {
 let popover = this.popoverCtrl.create(PopoverPage);
 popover.present({
   ev: myEvent
 });
}



shareVia(){
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Share via',
    buttons: [
      {
        text: 'Whatsapp',
        role: 'destructive',
        handler: () => {
          //console.log(this.indx);
 
          this.shareMsg=this.images[this.liked].message ;
          this.imgstring=this.shareMsg ;
          console.log(this.shareMsg);
 
          this.db.sendviaWhatsApps(this.shareMsg)
          console.log('Destructive clicked');
          console.log(this.shareMsg);
          console.log(this.liked);
          console.log(this.imgstring);
          
        }
      },{
        text: 'Facebook',
        handler: () => {
          console.log('Archive clicked');
          this.shareMsg=this.images[this.liked].message
          this.db.sendviaFacebook(this.shareMsg,this.shareMsg)
        }
      },{
        text: 'Email',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.db.sendViaemail(this.shareMsg)
          this.db.sendViaemail(this.shareMsg)
        }
      }
    ]
  });
  actionSheet.present();
 }
 

 Personalcard(){
   this.navCtrl.push(PersonalisedcardPage)
 }

}