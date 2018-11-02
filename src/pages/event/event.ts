import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController, ModalController} from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database' ;
import { AutomatePage } from '../automate/automate';
import { MessagePage } from '../message/message';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { ModalmessagePage } from '../modalmessage/modalmessage';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  mesaagesArray =[] ;
  msgz =[]

  indx =1
  constructor(public navCtrl: NavController, public navParams: NavParams, private db:DatabaseProvider,public popoverCtrl: PopoverController, private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController,public modalCtrl: ModalController) {
    this.db.getMessages().then((data:any)=>{
      this.mesaagesArray=data

      console.log(this.mesaagesArray);
      
      this.msgz=this.mesaagesArray[0].message;
      
    
    
      
    } , (error)=>{})
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad EventPage');
  }
  graduation(a){

    this.db.GraduationMessages().then((data:any)=>{
    
      console.log(data);
      // this.navCtrl.push(MessagePage  , )
      const modal = this.modalCtrl.create(MessagePage,{graduationMsg:data,categoryChosen:a});
      modal.present();
      
    } , (error)=>{})
    
      }
    
    
      wedding(a){
        this.db.weddingMessage().then((data:any)=>{
    
          console.log(data);
          // this.navCtrl.push(MessagePage  )
          const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data,categoryChosen:a});
          modal.present();
      
          
        } , (error)=>{})
        
    
      }
      anniversary(a){
        this.db.anniversaryMessage().then((data:any)=>{
    
          console.log(data);
          // this.navCtrl.push(MessagePage   )
          const modal = this.modalCtrl.create(MessagePage, {graduationMsg:data ,categoryChosen:a});
          modal.present();
      
          
        } , (error)=>{})
        
    
      }
      newJob(a){
        this.db.newJobMessage().then((data:any)=>{
    
          console.log(data);
          // this.navCtrl.push(MessagePage )
          const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data , categoryChosen:a} );
          modal.present();
        
          
        } , (error)=>{})
        
    
      }
      babyShower(a){
        this.db.babyShowerMessages().then((data:any)=>{
    
          console.log(data);
          // this.navCtrl.push(MessagePage  )
          const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data, categoryChosen:a});
          modal.present();
        
          
        } , (error)=>{})
        
    
      }
      birthday(a){
       
        this.db.birthdayMessages().then((data:any)=>{
    
          console.log(data);
          // this.navCtrl.push(MessagePage )
          const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data ,categoryChosen:a} );
          modal.present();
       
          
        } , (error)=>{})
        
    
      }
      thinkingofyou(a){
        this.db.thinkingofyou().then((data:any)=>{
          // this.navCtrl.push(MessagePage  )
          const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data ,categoryChosen:a});
          modal.present();
        
 
        })
 
      }
 
      other(a){
        this.db.General().then((data:any)=>{
 
          console.log(data);
          // this.navCtrl.push(MessagePage )
          const modal = this.modalCtrl.create(MessagePage  , {graduationMsg:data ,categoryChosen:a});
          modal.present();
          
 
        } , (error)=>{})
     
 
 
      }
      
 presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(PopoverPage);
  popover.present({
    ev: myEvent
  });
}


}
