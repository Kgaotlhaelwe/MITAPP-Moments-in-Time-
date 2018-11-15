import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController, ModalController} from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database' ;
import { AutomatePage } from '../automate/automate';
import { MessagePage } from '../message/message';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { ModalmessagePage } from '../modalmessage/modalmessage';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  mesaagesArray =[] ;
  msgz =[]

  indx =1

// graduation messages

  grads = [{message:"You can achieve whatever you want in life. All you have to do is believe that you can. We believe in you, happy graduation day."} ,
            {message:"You are brilliant, able and ambitious. You shall always walk the glory road. Happy Graduation. I bless you with all that you need to earn many more achievements and feats in life ahead. Congratulations and well done."}  ,
            {message:"Graduation isn’t the end of a tough journey. It is the beginning of a beautiful one"} ,
            {message:"Graduation is an exciting time. It marks both an ending and a beginning; it’s warm memories of the past and big dreams for the future."} ,
            {message:"Graduation wishes for lots and lots of fun and all it takes to make your day a very happy one! Congratulations, Graduate!"} ,
            {message:"Congratulations Graduate on this momentous day. You’ve worked hard to achieve your goals and now you’re on your way to seek new vistas, dream new dreams, embark on who you are, embrace life with passion and keep reaching for your star. Go for it!"}
]



// wedding messsage 

wed = [{message:"I hope your life with your spouse will be filled with lasting happiness and joy. Congratulations on your big day"},
      {message:"Always treat your partner better than you want to be treated, may you have the happiest of marriages. Congratulations"} ,
      {message:"Congratulations on your wedding dude, so glad you convinced someone to marry you"} ,
      {message:"I can’t remember a time I’ve seen you this happy, I’m so glad you found true love. congratulations and happy married life"} ,
      {message:"May your wedding day turn out just as you planned and may you have the happiest of marriages. Happy married life"} ,
      {message:"May today be the beginning of a long, happy life together. May your home be blessed with blessings beyond your imagination. Congratulations."}
]


// Anniversary 

AnniversaryMessage = [{message:"May your love grow like wildflowers, and happy anniversary to an amazing couple!"},
                      {message:"A love like yours lasts! Happy Anniversary"} ,
                      {message:"A couple anniversary messages to remember: Always treasure your partner and know the best is yet to come"} ,
                      {message:"Your love, dedication, and commitment to one another is truly an inspiration to all of us kids. Congratulations on your years of marriage"} ,
                      {message:"Wishing you more joy, laughter and happiness in the years to come. Happy Anniversary"} ,
                      {message:"Your anniversary began with a promise. May that promise continue to strengthen with each passing year"},
                      {message:"Count your anniversaries not by years alone, but by the great memories and happy times you’ve known"}
]

//job message


jobMessage = [{message:"A new job is a new blessing so just keep up the good work and stay strong!"} ,
              {message:"I wish you all the best in this new job of yours, I hope that you will enjoy it"} ,
              {message:"The best part in a new job is the chance to finally get to do what you love to do"} ,
              {message:"Take the time you need to adjust to this new job of yours, it will be alright"} ,
              {message:"After all your struggles, you are here now, congratulations on landing this job!"},
              {message:"The secret to succeeding at a new job is to exceed and surpass the job description. Here's wishing you all the best."},
              {message:"May your new job bring make you a billionaire so that we can party at your expense. Congrats."} ,
              {message:"You have worked so hard and deserve everything that is coming to you. Congratulations on the new job"}
]


babyShowerMessage = [{message:"Many best wishes for the remainder of your pregnancy and the birth of your little bundle of love"} ,
                    {message:"Being a parent is the highest paid job in the world since the payment is in pure love. Congratulations to two of the best parents the world could ever hope for"} ,
                    {message:"Parenthood is a wild ride full of love, laughter, questions, learning, excitement, craziness, hugs, kisses and so much more. Congrats on your tiny little teacher"} ,
                    {message:"I’m so excited for the two of you to be parents. I wish nothing but happiness and success for you both"} ,
                    {message:"A baby will make love stronger, days shorter, nights longer, bank balance smaller, home happier, clothes dirty, the past forgotten and the future worth living for. Congratulations."},
                    {message:"Wishing all the best to you and your precious baby"} ,
                     { message:"Sleep is overrated, babies are not! Especially your new bundle of love. Enjoy!"}

]

birthdayMessage = [{message:"Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!"} ,
                  {message:"A wish for you on your birthday, whatever you ask may you receive, whatever you seek may you find, whatever you wish may it be fulfilled on your birthday and always. Happy birthday!"} ,
                  {message:"Another adventure filled year awaits you. Welcome it by celebrating your birthday with pomp and splendor. Wishing you a very happy and fun-filled birthday!"} ,
                  {message:"May the joy that you have spread in the past come back to you on this day. Wishing you a very happy birthday!"},
                  {message:"This birthday, I wish you abundant happiness and love. May all your dreams turn into reality and may lady luck visit your home today. Happy birthday to one of the sweetest people I’ve ever known"},
                  {message:"Your birthday is the first day of another 365-day journey. Be the shining thread in the beautiful tapestry of the world to make this year the best ever. Enjoy the ride."}



]

thinkingofyouMessage = [{message:"Darling, you are a wonderful bloom in a beautiful garden where only true love grows! Wishing you a brilliant Birthday"},
                        {message:"Did you hear a light tap on your shoulder this midnight? It wasn’t Santa Claus, it was me wishing you a very Happy Birthday!"} ,
                        {message:"I wish I could attach my heart to this Birthday wish. That’s how much you mean to me. I wish you always be happy and I’ll do everything to make you so"} ,
                        {message:"Falling in love with you was easy. Staying in love with you is easier. Happy birthday. I can’t wait until next year"} ,
                        {message:"Sometimes words are hard to find to form that perfect line to let you know you are always on my mind. Happy birthday dear!"},
                        {message:"Dance as though no one is watching you, Love as though you have never loved before, Sing as though no one can hear you, Live as though heaven is on earth! I Wish you a very warm and Happy Birthday!"},
                        {message:"I wish I could attach my heart to this Birthday wish. That’s how much you mean to me. I wish you always be happy and I’ll do everything to make you so."}


]


generalMesage  = [{message:"Count your anniversaries not by years alone, but by the great memories and happy times you’ve known"},
                  {message:"Love is just a word until someone comes along and gives it meaning. Congratulations!"},
                  {message:"May your new job bring make you a billionaire so that we can party at your expense. Congrats"} ,
                  {message:"It takes only a few seconds to say I love you but it will take me an entire lifetime to show you how much"},
                  {message:"It takes only a few seconds to say I love you but it will take me an entire lifetime to show you how much"} ,
                  {message:"I wish I could attach my heart to this Birthday wish. That’s how much you mean to me. I wish you always be happy and I’ll do everything to make you so."} ,
                  {message:"Count your anniversaries not by years alone, but by the great memories and happy times you’ve known"} ,
                  {message:"Graduation is an exciting time. It marks both an ending and a beginning; it’s warm memories of the past and big dreams for the future."} ,



]








  constructor(public navCtrl: NavController, public navParams: NavParams, private db:DatabaseProvider,public popoverCtrl: PopoverController, private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController,public modalCtrl: ModalController,private network: Network , public toastCtrl: ToastController ) {
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
    this.navCtrl.push(MessagePage,{graduationMsg:this.grads,categoryChosen:a});
    
  }
    
    
      wedding(a){
        // this.db.weddingMessage().then((data:any)=>{
    
        //   console.log(data);
        //    this.navCtrl.push(MessagePage , {graduationMsg:data,categoryChosen:a});
        //  // const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data,categoryChosen:a});
        //   //modal.present();
      
          
        // } , (error)=>{

        //   alert(error)
        // })

        this.navCtrl.push(MessagePage , {graduationMsg:this.wed,categoryChosen:a})

        
    
      }
      anniversary(a){
        // this.db.anniversaryMessage().then((data:any)=>{
    
        //   console.log(data);
        //  this.navCtrl.push(MessagePage, {graduationMsg:data ,categoryChosen:a});
        //  const modal = this.modalCtrl.create(MessagePage, {graduationMsg:data ,categoryChosen:a});
        //  // modal.present();
      
          
        // } , (error)=>{

        //   alert(error)
        // })

        this.navCtrl.push(MessagePage, {graduationMsg:this.AnniversaryMessage ,categoryChosen:a});
        
    
      }
      newJob(a){
        // this.db.newJobMessage().then((data:any)=>{
    
        //   console.log(data);
        //  this.navCtrl.push(MessagePage , {graduationMsg:data , categoryChosen:a} );
        //   //  const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data , categoryChosen:a} );
        //  // modal.present();
        
          
        // } , (error)=>{

        //   alert(error)
        // })

        this.navCtrl.push(MessagePage , {graduationMsg:this.jobMessage , categoryChosen:a} );
        
    
      }
      babyShower(a){
        // this.db.babyShowerMessages().then((data:any)=>{
    
        //   console.log(data);
        //   this.navCtrl.push(MessagePage , {graduationMsg:data, categoryChosen:a});
        //    //const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data, categoryChosen:a});
        //  // modal.present();
        
          
        // } , (error)=>{
        //   alert(error)
        // })


        this.navCtrl.push(MessagePage , {graduationMsg:this.babyShowerMessage, categoryChosen:a});
        
    
      }
      birthday(a){
       
        // this.db.birthdayMessages().then((data:any)=>{
    
        //   console.log(data);
        //   this.navCtrl.push(MessagePage , {graduationMsg:data ,categoryChosen:a} );
        //    //const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data ,categoryChosen:a} );
        //  // modal.present();
       
          
        // } , (error)=>{
        //   alert(error)
        // })


        this.navCtrl.push(MessagePage , {graduationMsg:this.birthdayMessage ,categoryChosen:a} );
        
    
      }
      thinkingofyou(a){
        // this.db.thinkingofyou().then((data:any)=>{
        //   this.navCtrl.push(MessagePage , {graduationMsg:data ,categoryChosen:a} );
         
        //   // const modal = this.modalCtrl.create(MessagePage , {graduationMsg:data ,categoryChosen:a});
        //  // modal.present();
        
 
        // }, (error)=>{
        //   alert(error)
        
        // })


        this.navCtrl.push(MessagePage , {graduationMsg:this.thinkingofyouMessage ,categoryChosen:a} );
        

 
      }
 
      other(a){
        // this.db.General().then((data:any)=>{
 
        //   console.log(data);
        //   this.navCtrl.push(MessagePage  , {graduationMsg:data ,categoryChosen:a});
        //   // const modal = this.modalCtrl.create(MessagePage  , {graduationMsg:data ,categoryChosen:a});
        //   //modal.present();
          
 
        // } , (error)=>{
        //   alert(error)
        // })


        this.navCtrl.push(MessagePage  , {graduationMsg:this.generalMesage ,categoryChosen:a});
     
 
 
      }
      
 presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(PopoverPage);
  popover.present({
    ev: myEvent
  });
}


}
