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
import { Network } from '@ionic-native/network';
import { LoadingController } from 'ionic-angular';
import { ImageLoader } from 'ionic-image-loader';
import { AlertController } from 'ionic-angular';

//import { IonicImageLoader } from 'ionic-image-loader';
//import { ImgLoader } from 'ionic-image-loader';

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
hasMessages ;


url ;

imagesArray = []





 constructor(public navCtrl: NavController , private db:DatabaseProvider, private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController,public popoverCtrl: PopoverController , private sanitizer: DomSanitizer, public toastCtrl: ToastController,private network: Network, public loadingCtrl: LoadingController , private imageLoader: ImageLoader, public alertCtrl: AlertController ) {
 
  
  this.db.getMessages().then((data:any)=>{
     console.log(data);
    this.images =data
    



     this.imzx = this.images[this.liked].message
     
 
     console.log(this.imzx);
     if (name !== null) {}
     for (let i = 0; i < this.images.length-2; i++) {
      
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






clearCache(refresher) {
  this.imageLoader.clearCache();
  refresher.complete();
}

onImageLoad(event) {
  console.log('image ready: ', event);
}


presentLoading() {
 
}
displayNetworkUpdate(connectionState:string){
  let networkType =this.network.type
  this.toastCtrl.create({
    message:connectionState ,
    duration:3000 ,

    cssClass:'toast1' ,
  }).present()
 
 }

ionViewDidEnter() {
  // this.network.onConnect().subscribe(data=>{
  //   console.log(data)
  //  // this.displayNetworkUpdate('Connected')
   
  //  }
  
  // ,error=>console.error(error));
   
   this.network.onDisconnect().subscribe(data=>{
   
    console.log(data)
    this.displayNetworkUpdate('Disconected to the network, please try again')
   },error=>console.error(error));
  
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
  
 
  
  if(this.liked ==this.images.length-2){

    const prompt = this.alertCtrl.create({
      title:"Oops! you ran out of cards ",
      message: " You have no cards to swipe but you can create your own card",
   
      buttons: [
        {
          text: 'NO',
          handler: data => {
            console.log('Cancel clicked');
            this.hasMessages="You have no cards left to swipe but you can create your own card click on the pen tool at the top right  "
          }
        },
        {
          text: ' YES ',
          handler: data => {
            console.log('Saved clicked');

            this.navCtrl.push(PersonalisedcardPage)
          }
        }
      ]
    });
    prompt.present();
   

   
   
    
  }

  this.imzx =this.images[this.liked].message
 
 
  
 
 
 
  
 
 
}
 if(event.like == true){
  //this.db.likedMessage(  this.imzx).then(()=>{})
  this.db.creatlikeImage(this.imzx).then(()=>{})
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
  
  if(this.liked ==this.images.length-2){
   
    const prompt = this.alertCtrl.create({
      title:"Oops! you ran out of cards ",
      message: " You have no cards to swipe but you can create your own card",
   
      buttons: [
        {
          text: 'NO',
          handler: data => {
            console.log('Cancel clicked');
            this.hasMessages="You have no cards left to swipe but you can create your own card click on the pen tool at the top right  "
          }
        },
        {
          text: ' YES ',
          handler: data => {
            console.log('Saved clicked');

            this.navCtrl.push(PersonalisedcardPage)
          }
        }
      ]
    });
    prompt.present();
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


  if(this.liked != this.images.length-2){
    this.db.creatlikeImage(this.imzx).then(()=>{})
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
  
  if(this.liked ==this.images.length-2){
    // this.images.splice(0,this.images.length);
    // console.log(this.images);
    
    // this.db.getMessages().then((data:any)=>{
    //   this.images=data
    // })
    // this.liked = 0 ;


    const prompt = this.alertCtrl.create({
      title:"Oops! you ran out of cards ",
      message: " You have no cards to swipe but you can create your own card",
      buttons: [
        {
          text: 'NO',
          handler: data => {
            console.log('Cancel clicked');
            this.hasMessages="You have no cards left to swipe but you can create your own card click on the pen tool at the top right  "

          }
        },
        {
          text: ' YES ',
          handler: data => {
            console.log('Saved clicked');

            this.navCtrl.push(PersonalisedcardPage)
          }
        }
      ]
    });
    prompt.present();
  }
  this.imzx =this.images[this.liked].message



  }else{
    const toast = this.toastCtrl.create({
      message: "You have no cards to like",
      cssClass:'toast1' ,
      duration: 3000
    });
    toast.present();
  }

  
  
}
 
 
 
dislike(){

  if(this.liked != this.images.length -2){

    this.liked = this.liked + 1
    this.textdisplay=this.cardOverlay.dislike.indicator
    const toast = this.toastCtrl.create({
      message: this.textdisplay,
      cssClass:'toast1' ,
      duration: 2000
    });
    toast.present();
    console.log( this.textdisplay);
    
   
    
    if(this.liked ==this.images.length-2){
      const prompt = this.alertCtrl.create({
        title:"Oops! you ran out of cards ",
        message: " You have no cards to swipe but you can create your own card",
     
        buttons: [
          {
            text: 'NO',
            handler: data => {
              console.log('Cancel clicked');
              this.hasMessages="You have no cards left to swipe but you can create your own card click on the pen tool at the top right  "
            }
          },
          {
            text: ' YES ',
            handler: data => {
              console.log('Saved clicked');
  
              this.navCtrl.push(PersonalisedcardPage)
            }
          }
        ]
      });
      prompt.present();
    }
    this.imzx =this.images[this.liked].message
   
   }else {
    const toast = this.toastCtrl.create({
      message: "You have no cards to dislike",
      cssClass:'toast1' ,
      duration: 3000
    });
    toast.present();
   }
  
  }




  insertpic(event){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;

        this.imagesArray.push(this.url)
        console.log(this.imagesArray);






        
        
      };
      reader.readAsDataURL(event.target.files[0]);
      //console.log(event.target.files);
      let selectedfile = event.target.files[0];

  }

  }}



