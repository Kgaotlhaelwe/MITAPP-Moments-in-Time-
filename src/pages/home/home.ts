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
 import { ToastController } from 'ionic-angular';
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
         backgroundColor: '#28e93b' ,
         indicator:"Liked"
     },
     dislike: {
         backgroundColor: '#e92828' ,
         indicator:"Disliked"
     }
 };
 images= [];
slidingImage ;
textdisplay;
imzx=[] ;
hasMessages : boolean = false;
 constructor(public navCtrl: NavController , private db:DatabaseProvider, private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController,public popoverCtrl: PopoverController , private sanitizer: DomSanitizer, public toastCtrl: ToastController) {
  
  this.db.getMessages().then((data:any)=>{
     console.log(data);
     this.images=data
     console.log(this.images);

     this.imzx = this.images[this.liked].message
     
   // this.imzx =this.images[this.liked].message
     console.log(this.imzx);
     
     for (let i = 0; i < this.images.length; i++) {
      
       this.attendants.push({
           id: i + 1,
           likeEvent: new EventEmitter(),
           destroyEvent: new EventEmitter(),
          asBg: sanitizer.bypassSecurityTrustStyle('url('+this.images[i]+')')
       });
  
      
    
   
  
}
   this.ready = true;
    
   } , (error)=>{})
}
onCardInteract(event) {
 console.log(event.like);
if(event.like == false){
  this.liked = this.liked + 1
  this.textdisplay=this.cardOverlay.dislike.indicator
  const toast = this.toastCtrl.create({
    message: this.textdisplay,
    cssClass:'toast1' ,
    duration: 3000
  });
  toast.present();
  console.log( this.textdisplay);
  
 
  
  if(this.liked ==this.images.length){
    this.images.splice(0,this.images.length);
    console.log(this.images);
    
    this.db.getMessages().then((data:any)=>{
      this.images=data
    })
    this.liked =0 ;
   
    
  }
  this.imzx =this.images[this.liked].message
 
 
  
 
 
 
  
 
 
}
 if(event.like == true){
  this.db.likedMessage(  this.imzx).then(()=>{})
  this.liked = this.liked + 1
  this.textdisplay=this.cardOverlay.like.indicator
  const toast = this.toastCtrl.create({
    message: this.textdisplay,
    cssClass:'toast' ,
    duration: 2000
  });
  toast.present();
  console.log( this.textdisplay);
  
  
  console.log(this.textdisplay);
  
  if(this.liked ==this.images.length){
    this.images.splice(0,this.images.length);
    console.log(this.images);
    
    this.db.getMessages().then((data:any)=>{
      this.images=data
    })
    this.liked = 0 ;
  }
  this.imzx =this.images[this.liked].message
  
}
 
}
presentPopover(myEvent) {
 let popover = this.popoverCtrl.create(PopoverPage);
 popover.present({
   ev: myEvent
 }); 
}
shareVia(){
    this.imzx =this.images[this.liked].message
 
           this.db.sendviaWhatsApps(this.imzx)
}
 
 Personalcard(){
   this.navCtrl.push(PersonalisedcardPage)
 }
 like(){
  this.db.likedMessage(this.imzx).then(()=>{})
  this.liked = this.liked + 1
  this.textdisplay=this.cardOverlay.like.indicator
  const toast = this.toastCtrl.create({
    message: this.textdisplay,
    cssClass:'toast' ,
    duration: 2000
  });
  toast.present();
  console.log( this.textdisplay);
  
  
  console.log(this.textdisplay);
  
  if(this.liked ==this.images.length){
    this.images.splice(0,this.images.length);
    console.log(this.images);
    
    this.db.getMessages().then((data:any)=>{
      this.images=data
    })
    this.liked = 0 ;
  }
  this.imzx =this.images[this.liked].message
  
}
 
 
 
dislike(){
  this.liked = this.liked + 1
  this.textdisplay=this.cardOverlay.dislike.indicator
  const toast = this.toastCtrl.create({
    message: this.textdisplay,
    cssClass:'toast1' ,
    duration: 2000
  });
  toast.present();
  console.log( this.textdisplay);
  
 
  
  if(this.liked ==this.images.length){
    this.images.splice(0,this.images.length);
    console.log(this.images);
    
    this.db.getMessages().then((data:any)=>{
      this.images=data
    })
    this.liked =0 ;
  }
  this.imzx =this.images[this.liked].message
 
 }
}