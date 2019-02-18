import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, AlertController,Keyboard } from 'ionic-angular';
import { AutomatePage } from '../automate/automate';
import { PersonalizedPage } from '../personalized/personalized';
import { AdminPage } from '../admin/admin';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TabsPage } from '../tabs/tabs';
import { EventPage } from '../event/event';
import *as moment from 'moment';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { Calendar } from '@ionic-native/calendar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { DatabaseProvider } from '../../providers/database/database';
import arry from '../automate/automate'
import { ModalmessagePage } from '../modalmessage/modalmessage';
import { LoginPage } from '../login/login';
import { Network } from '@ionic-native/network';

import { ToastController, LoadingController } from 'ionic-angular';
import { memory } from '@angular/core/src/render3/instructions';

declare var firebase;

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  graduationMsg = this.navParams.get("graduationMsg");


  weddingMsg = this.navParams.get("weddingMsg");
  newJobMsg = this.navParams.get("newJobMsg");
  birthdayMsg = this.navParams.get("birthdayMsg");
  babyShowerMsg = this.navParams.get("babyShowerMsg");
  anniversaryMsg = this.navParams.get("anniversaryMsg");
  modalMessage = this.navParams.get("modalMessage");
  peronalisedMsg = this.navParams.get("peronalisedMsg");

  categoryChosen = this.navParams.get("categoryChosen");

  phoneNumber;
  name = this.navParams.get("name");;
  date = this.navParams.get("date");
  time = this.navParams.get("time");
  countDownDate;
  messageType;
  today;
  messagez;
  image;

  messagezz;
  // name1 =this.navParams.get("name1"); ;
  date1;

  messageArry = arry;
  personalisedMessage: boolean = false;
  autoMessage: boolean = false;
  automsg;
  saveMessage;
  showName;
  selectedDetails = this.navParams.get("selectedDetails");

  temptime;
  tempdate

  textboxmessage;

  userName;


  grads = [{ message: "You can achieve whatever you want in life. All you have to do is believe that you can. We believe in you, happy graduation day." },
  { message: "You are brilliant, able and ambitious. You shall always walk the glory road. Happy Graduation. I bless you with all that you need to earn many more achievements and feats in life ahead. Congratulations and well done." },
  { message: "Graduation isn’t the end of a tough journey. It is the beginning of a beautiful one" },
  { message: "Graduation is an exciting time. It marks both an ending and a beginning; it’s warm memories of the past and big dreams for the future." },
  { message: "Graduation wishes for lots and lots of fun and all it takes to make your day a very happy one! Congratulations, Graduate!" },
  { message: "Congratulations Graduate on this momentous day. You’ve worked hard to achieve your goals and now you’re on your way to seek new vistas, dream new dreams, embark on who you are, embrace life with passion and keep reaching for your star. Go for it!" }
  ]



  // wedding messsage 

  wed = [{ message: "I hope your life with your spouse will be filled with lasting happiness and joy. Congratulations on your big day" },
  { message: "Always treat your partner better than you want to be treated, may you have the happiest of marriages. Congratulations" },
  { message: "Congratulations on your wedding dude, so glad you convinced someone to marry you" },
  { message: "I can’t remember a time I’ve seen you this happy, I’m so glad you found true love. congratulations and happy married life" },
  { message: "May your wedding day turn out just as you planned and may you have the happiest of marriages. Happy married life" },
  { message: "May today be the beginning of a long, happy life together. May your home be blessed with blessings beyond your imagination. Congratulations." }
  ]


  // Anniversary 

  AnniversaryMessage = [{ message: "May your love grow like wildflowers, and happy anniversary to an amazing couple!" },
  { message: "A love like yours lasts! Happy Anniversary" },
  { message: "A couple anniversary messages to remember: Always treasure your partner and know the best is yet to come" },
  { message: "Your love, dedication, and commitment to one another is truly an inspiration to all of us kids. Congratulations on your years of marriage" },
  { message: "Wishing you more joy, laughter and happiness in the years to come. Happy Anniversary" },
  { message: "Your anniversary began with a promise. May that promise continue to strengthen with each passing year" },
  { message: "Count your anniversaries not by years alone, but by the great memories and happy times you’ve known" }
  ]

  //job message


  jobMessage = [{ message: "A new job is a new blessing so just keep up the good work and stay strong!" },
  { message: "I wish you all the best in this new job of yours, I hope that you will enjoy it" },
  { message: "The best part in a new job is the chance to finally get to do what you love to do" },
  { message: "Take the time you need to adjust to this new job of yours, it will be alright" },
  { message: "After all your struggles, you are here now, congratulations on landing this job!" },
  { message: "The secret to succeeding at a new job is to exceed and surpass the job description. Here's wishing you all the best." },
  { message: "May your new job  make you a billionaire so that we can party at your expense. Congrats." },
  { message: "You have worked so hard and deserve everything that is coming to you. Congratulations on the new job" }
  ]


  babyShowerMessage = [{ message: "Many best wishes for the remainder of your pregnancy and the birth of your little bundle of love" },
  { message: "Being a parent is the highest paid job in the world since the payment is in pure love. Congratulations to two of the best parents the world could ever hope for" },
  { message: "Parenthood is a wild ride full of love, laughter, questions, learning, excitement, craziness, hugs, kisses and so much more. Congrats on your tiny little teacher" },
  { message: "I’m so excited for the two of you to be parents. I wish nothing but happiness and success for you both" },
  { message: "A baby will make love stronger, days shorter, nights longer, bank balance smaller, home happier, clothes dirty, the past forgotten and the future worth living for. Congratulations." },
  { message: "Wishing all the best to you and your precious baby" },
  { message: "Sleep is overrated, babies are not! Especially your new bundle of love. Enjoy!" }

  ]

  birthdayMessage = [{ message: "Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!" },
  { message: "A wish for you on your birthday, whatever you ask may you receive, whatever you seek may you find, whatever you wish may it be fulfilled on your birthday and always. Happy birthday!" },
  { message: "Another adventure filled year awaits you. Welcome it by celebrating your birthday with  splendor. Wishing you a very happy and fun-filled birthday!" },
  { message: "May the joy that you have spread in the past come back to you on this day. Wishing you a very happy birthday!" },
  { message: "This birthday, I wish you abundant happiness and love. May all your dreams turn into reality and may lady luck visit your home today. Happy birthday to one of the sweetest people I’ve ever known" },
  { message: "Your birthday is the first day of another 365-day journey. Be the shining thread in the beautiful tapestry of the world to make this year the best ever. Enjoy the ride." }



  ]

  thinkingofyouMessage = [{ message: "There is one good thing about not seeing you… I can think of you!" },
  { message: "When you fall asleep every night, I can`t! Thoughts about you don`t let me sleep!" },
  { message: "As old saying claims: we are what we are thinking about. As for me, I`m thinking of you. What about you?" },
  { message: "It doesn`t matter when we`re not together. Because I`m thinking of you, and this fact makes me closer to you!" },
  { message: "I hope once you`ll realize how hard it can be thinking of you!" },
  { message: "Don`t worry about all problems you have… Someone is thinking of you!" },
  { message: " If you love someone, you realize it when cannot stop thinking about this person…" }


  ]


  generalMesage = [{ message: "A man loves his sweetheart the most, his wife the best, but his mother the longest." },
  { message: "Your absence is creating a vacuum and we are missing you so much. You have always made a great difference in our lives when you were fit. Now you’re ill, we wish you speedy recovery and join our hands in prayer to proclaim you healing." },
  { message: "Get well soon lazy brother. Your absence has created more work than I can handle. The more you stay in the hospital, the more work I have to do. Anyway, get well very quickly and come home. I’m missing you." },
  { message: "I do not wish to consider why you are taking long to recover; no, you are not been nursed there. To be frank, I think I’m missing you badly, wishing you speedy recovery, for I can’t wait any longer. Get well soondear." },
  { message: "There are several reasons your family is worried and needs you at home, and one of it is that you are so wonderful and we just need you back here. Get well soon. We love you." },
  { message: "As the beauty and gifts of yuletide fades to usher a New Year, may your new beginnings be renewed with good tidings, happiness, hope and peace." },
  { message: "A new year is a fresh start for realization of dreams, may the beginning of this year fill you with new strength, bravery and faith necessary to achieve your dreams. Happy New Year." },
  { message: "Wishing you the best during this joyful season. I hope your holidays are filled with festivities and plenty of merry enjoyment." },



  ]

  userCategory;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, private sms: SMS, private socialSharing: SocialSharing, private contacts: Contacts, public modalCtrl: ModalController, private localNotifications: LocalNotifications, private backgroundMode: BackgroundMode, private db: DatabaseProvider, private calendar: Calendar, private network: Network, public toastCtrl: ToastController, public loadingCtrl: LoadingController,private keyboard: Keyboard) {
    this.time = moment(new Date()).format()
    // this.temptime = moment(new Date()).format()




    this.tempdate = moment(new Date()).format()

    console.log(this.selectedDetails);

    this.showName = this.selectedDetails.name

    console.log(this.selectedDetails);

    var users = firebase.auth().currentUser;
    firebase.database().ref("user/" + users.uid).on('value', (data: any) => {
      var profile = data.val();

      console.log(profile);
      this.userName = profile.name

      console.log(this.userName);
      



    })
    this.keyboard.onClose(this.closeCallback);

  }
  closeCallback() {
    // call what ever functionality you want on keyboard close
    // console.log('Closing time');  document.getElementById('textfix').style.top="-3%";
    //  document.getElementById('textfix').style.left="-1%";
    //  document.getElementById('textfix').style.position = 'relative';
  }
  test(){
  
  }
  // keyboardCheck() {
  //   console.log('The keyboard is open:', this.keyboard.isOpen());
  //   // document.getElementById('textfix').style.top="50%";
  //   // document.getElementById('textfix').style.left="50%";
  //   // document.getElementById('textfix').style.position = 'relative';
  //   document.getElementById('textfix').style.display="flex";
  //   document.getElementById('textfix').style.justifyContent="center";
  //   document.getElementById('textfix').style.alignItems="center";
  //   document.getElementById('textfix').style.marginTop="10%";
  //   console.log('asdf');
    
  // }
  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
  }
 
   ionViewWillLeave() {
  // let tabs = document.querySelectorAll('.show-tabbar');
  // if (tabs !== null) {
  //     Object.keys(tabs).map((key) => {
  //         tabs[key].style.display = 'flex';
  //     });
 
  // }
  // }


  // displayNetworkUpdate(connectionState:string){
  //   let networkType =this.network.type
  //   this.toastCtrl.create({
  //     message:connectionState ,
  //     duration:3000 ,
  //   }).present()



  
  var users = firebase.auth().currentUser;
  firebase.database().ref("user/" + users.uid).on('value', (data: any) => {
    var profile = data.val();

    console.log(profile);
    this.userName = profile.name

    console.log(this.userName);
    



  })

   }

  ionViewDidEnter() {


    
    var users = firebase.auth().currentUser;
    firebase.database().ref("user/" + users.uid).on('value', (data: any) => {
      var profile = data.val();

      console.log(profile);
      this.userName = profile.name

      console.log(this.userName);
      



    })



    this.userCategory = this.selectedDetails.categoryChosen;
    // this.network.onConnect().subscribe(data=>{
    //   console.log(data)
    //   this.displayNetworkUpdate('Connected')

    //  }

    // ,error=>console.error(error));

    //  this.network.onDisconnect().subscribe(data=>{

    //   console.log(data)
    //   this.displayNetworkUpdate('Disconected')
    //  },error=>console.error(error));


    if (this.messageArry.length == 1) {
      this.textboxmessage = this.messageArry[0].message
      console.log(this.messageArry);

      this.messageArry.splice(0, this.messageArry.length)

      // this.autoMessage = true;
      // document.getElementById("btnz").style.display = "block";
      // document.getElementById("btnMessageType").style.display = "none"

    }






    if (this.messageType == 'a') {
      // this.navCtrl.push
      const modal = this.modalCtrl.create(AutomatePage, { graduation: this.graduationMsg, chosenDate: this.date, chosenTime: this.time, name: this.name, categoryChosen: this.categoryChosen, countDownDate: this.countDownDate });
      modal.present();

    }



    if ("Birthday" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Wedding_Cake_100px.png";
      console.log(this.image);

    }
    else if ("Graduations" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Graduation_Cap_100px.png";
      console.log(this.image);

    } else if ("Baby Shower" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Pram_100px.png";
      console.log("getimage");

      console.log(this.image);

    }
    else if ("New Jobs" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Briefcase_100px.png";
      console.log(this.image);

    }
    else if ("Anniversary" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Wedding_Gift_96px.png";
      console.log(this.image);

    }
    else if ("Weddings" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";
      console.log(this.image);

    }
    else if ("Thinking of you" == this.selectedDetails.categoryChosen) {
      this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";
      console.log(this.image);

    }
    else if ("General" == this.selectedDetails.categoryChosen) {
      this.image = "../../assets/icon/icons8_People_100px.png";
      console.log(this.image);

    }

  }



  chooseDate() {


    let d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getUTCHours();
    var minute = d.getUTCMinutes();
    var second = d.getUTCSeconds();
    var today = year + "-" + '0' + month + "-" + day + "T" + hour + ":" + minute + ":" + second;

    console.log(today);
    console.log(this.date);




    if (this.date == undefined) {

      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: "Please enter all details",
        buttons: ['OK']
      });
      alert.present();

    }

    else if (this.name == undefined) {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: "Please fill in the name",
        buttons: ['OK']
      });
      alert.present();

    }
    else if (this.date < today) {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: "You have selected the previous year, please select current year or greater.",
        buttons: ['OK']
      });
      alert.present();
    }

    else {
      //this.message() ;}

    }
  }


  autoMsg() {

    if (this.selectedDetails.categoryChosen == "Birthday") {
      this.navCtrl.push(AutomatePage, { autoMsgArray: this.birthdayMessage })
      
    } else if (this.selectedDetails.categoryChosen == "Graduations") {
      this.navCtrl.push(AutomatePage, { autoMsgArray: this.grads });

    }

    else if (this.selectedDetails.categoryChosen == "Baby Shower") {
      this.navCtrl.push(AutomatePage, { autoMsgArray: this.babyShowerMessage })
    } else if (this.selectedDetails.categoryChosen == "Weddings") {

      this.navCtrl.push(AutomatePage, { autoMsgArray: this.wed })
    } else if ("New Jobs" == this.selectedDetails.categoryChosen) {
      console.log("in");

      this.navCtrl.push(AutomatePage, { autoMsgArray: this.jobMessage })
    } else if ("Thinking of you" == this.selectedDetails.categoryChosen) {
      this.navCtrl.push(AutomatePage, { autoMsgArray: this.thinkingofyouMessage })
    } else if ("General" == this.selectedDetails.categoryChosen) {
      this.navCtrl.push(AutomatePage, { autoMsgArray: this.generalMesage })

    } else if ("Anniversary" == this.selectedDetails.categoryChosen) {
      this.navCtrl.push(AutomatePage, { autoMsgArray: this.AnniversaryMessage })

    }

  }


  send() {
    var users = firebase.auth().currentUser;
    var userName;
    console.log(this.image);
    
 
    let today = new Date()
    let uniquedate = new Date().getTime();
 
    console.log(today) ;
 
    console.log(this.userName);
 
    let currentday = moment(today).format('YYYY-MM-DD');
    let scheduledetail = moment(this.selectedDetails.date).format('YYYY-MM-DD');
 
 
    console.log(this.textboxmessage)
 
    if (scheduledetail > currentday) {
      if (this.textboxmessage == undefined) {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: 'Please Enter a message before sending ',
          buttons: ['OK']
 
        });
        alert.present();
 
 
 
      }
 
 
      else {
        //scheduleEmails
        console.log(this.selectedDetails.categoryChosen);
        console.log(this.selectedDetails.date);
        console.log(this.selectedDetails.email);
        console.log(this.textboxmessage);
        console.log(this.userName);
        console.log(uniquedate);
        console.log(this.image);
        
        
        
        
        // this.db.scheduleEmails("Birthday", "2019-02-2019" , "Kgaotlhaelwe@gmail.com'" , "gdggdgdggd" , " 0" , "  0" , "bbbbbbb")
        
        this.db.scheduleEmails(this.selectedDetails.categoryChosen,this.selectedDetails.date, this.selectedDetails.email, this.textboxmessage, this.userName, uniquedate,this.image).then(()=>{
          this.db.scheduleEmailForFunction(this.selectedDetails.categoryChosen, this.selectedDetails.date, this.selectedDetails.email, this.textboxmessage, this.userName, uniquedate)
        });
 
 
 
        console.log(this.selectedDetails.name);
        console.log(this.textboxmessage);
        console.log(this.selectedDetails.date);
        console.log(this.image);
 
 
 
 
        this.db.saveReviewMessages(this.selectedDetails.name, this.textboxmessage, this.selectedDetails.date, this.image).then(() => {
          const loader = this.loadingCtrl.create({
            content: "Scheduling message, please wait...",
            duration: 3000
          });
          loader.present();
          setTimeout(() => {
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(ModalmessagePage).then(() => {
              this.navCtrl.remove(currentIndex);
            });
 
 
          }, 3000)
 
 
        }, (error) => { })
 
 
 
 
      }
 
 
 
 
    }

  }
  textaera(){
    console.log('in');
    document.getElementById('textfix').style.zIndex="10000000000000"
  }


  
}



