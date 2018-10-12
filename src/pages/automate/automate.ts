import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SMS } from '@ionic-native/sms';
import { Contacts } from '@ionic-native/contacts';
import * as moment from 'moment';
import { AboutPage } from '../about/about';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the AutomatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-automate',
  templateUrl: 'automate.html',
})
export class AutomatePage {
  phoneNumber;
  // name ;
  peronalisedMsg
  //sms ;
  graduation = this.navParams.get("graduation")
  message;

  date = new Date();
  countDownDate = this.navParams.get("countDownDate")

  chosenDate = this.navParams.get("chosenDate");
  chosenTime = this.navParams.get("chosenTime");
  name = this.navParams.get("name");
  categoryChosen = this.navParams.get("categoryChosen");

  image;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private localNotifications: LocalNotifications, private sms: SMS, private contacts: Contacts, private db: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutomatePage');

    console.log(this.graduation);

    if ("Birthday" == this.categoryChosen) {
      this.image = "../../assets/icon/icons8_Wedding_Cake_100px.png";
    }
    else if ("Graduation" == this.categoryChosen) {
      this.image = "../../assets/icon/icons8_Graduation_Cap_100px.png";

    } else if ("Baby Shower" == this.categoryChosen) {
      this.image = "../../assets/icon/icons8_Pram_100px.png";

    }
    else if ("New Job" == this.categoryChosen) {
      this.image = "../../assets/icon/icons8_Briefcase_100px.png";

    }
    else if ("Anniversary" == this.categoryChosen) {
      this.image = "../../assets/icon/icons8_Wedding_Gift_96px.png";

    }
    else if ("Wedding" == this.categoryChosen) {
      this.image = "../../assets/icon/icons8_Diamond_Ring_100px.png";

    }
    else if ("Thinking of you" == this.categoryChosen) {
      this.image = " ../../assets/icon/icons8_Collaboration_Female_Male_100px_1.png";

    }
    else if ("General" == this.categoryChosen) {
      this.image = "../../assets/icon/icons8_People_100px.png";

    }
  }

  contactss() {
    this.contacts.pickContact().then((data: any) => {
      console.log(data);

      this.phoneNumber = (data.phoneNumbers[0].value);
      this.name = (data.displayName);
    }, (error) => {
      alert(error)
    })
  }


  autoMessagessssss(message) {

    let date = moment(this.chosenDate + " " + this.chosenTime).format('MMMM DD YYYY, h:mm:ss a');



    this.localNotifications.schedule({

      title: "MOMENT IN TIME",
      text: this.name,
      icon: 'http://example.com/icon.png',
      trigger: { at: new Date(new Date(date)) },
    })

    this.db.saveSentMessages(this.name, message, this.chosenDate, this.image).then(() => { }, (error) => { });

    this.navCtrl.push(AboutPage, { message: message, countDownDate: this.countDownDate, name: this.name })

  }
  showConfirm() {
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
          text: 'Schedule',
          handler: () => {
            console.log(this.phoneNumber);

            this.sms.send(this.phoneNumber, this.message).then(() => {
              alert('success')
            }, (error) => {
              alert(error)

            })


          }
        }
      ]
    });
    confirm.present();

  }




}
