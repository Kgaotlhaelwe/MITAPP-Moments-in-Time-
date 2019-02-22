import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { ContactPage } from '../contact/contact';
import { LoadingController } from 'ionic-angular';
import *as moment from 'moment';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { EventPage } from '../event/event';
import { MessagePage } from '../message/message';

/**
 * Generated class for the AddContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-contacts',
  templateUrl: 'add-contacts.html',
})
export class AddContactsPage {
  name;
  email;
  myDate;

  name1;
  email1;
  date1;

  categoryChosen = this.navParams.get("categoryChosen");
  getContactDetails = this.navParams.get("getContactDetails");
  selectedDetails = this.navParams.get("selectedDetails");
  tempCategory;

  temparray = [];
  hideDate;

  showDate;
  kb;

  day;
  month;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {


    this.hideDate = true;

    this.db.getContactlist().then((data: any) => {
      this.temparray = data
      console.log(this.temparray)


    })

    console.log(this.categoryChosen);

    if (this.categoryChosen == undefined) {
      this.tempCategory = "General";
      console.log("general");


    }


    this.tempCategory = this.categoryChosen;





    if (this.getContactDetails != undefined) {

      this.name1 = this.getContactDetails.name;
      this.email1 = this.getContactDetails.email;
      this.tempCategory = this.categoryChosen
      console.log("kkkk");

      console.log(this.tempCategory);



    } else {




    }



    if (this.selectedDetails != undefined) {

      this.name1 = this.selectedDetails.name;
      this.email1 = this.selectedDetails.email;
      this.tempCategory = this.selectedDetails.categoryChosen


    } else {




    }



    if (this.tempCategory == "Birthday") {
      this.showDate = true;
      this.hideDate = false;

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactsPage');
    console.log(this.getContactDetails);

  }




  dateChanged(a) {

    let z = "0";
    let x = "-";

    console.log(a)

    if (a.day <= 9) {
      let stringDate = a.day.toString();

      this.day = z + stringDate


    } else {
      let stringDate = a.day.toString();
      this.day = stringDate
    }

    if (a.month <= 9) {
      let stringDate = a.month.toString();

      this.month = z + stringDate + x;

    } else {
      let stringDate = a.month.toString();
      this.month = stringDate + x
    }


  }


 
  async addDetails(a) {



    if (this.name != undefined && this.email != undefined) {

      let atpos = this.email.indexOf("@");
      let dotpos = this.email.lastIndexOf(".")
      console.log(atpos);
      console.log(dotpos);



      if (atpos < 1 || (dotpos - atpos < 2)) {

        this.db.showAlert("Email Incorrect", "Please Enter the correct email")


      } else {



        let date = moment(this.myDate).format('ll');

        var dup

        if (this.temparray.length > 0) {
          for (let index = 0; index < this.temparray.length; index++) {

            console.log(this.email);
            console.log(this.temparray[index].email);


            if (this.temparray[index].email == this.email) {
              dup = 1
              console.log(dup);

              break;
            } else {
              dup = 0


            }

          }

          if (dup == 0) {
            this.db.saveContactList(this.name, this.email, date).then(() => {
              const loader = this.loadingCtrl.create({
                content: "Please wait...",
                duration: 3000
              });
              console.log(this.tempCategory);

              loader.present();
            })
          }

        } else {

          this.db.saveContactList(this.name, this.email, date).then(() => {
            const loader = this.loadingCtrl.create({
              content: "Please wait...",
              duration: 1000
            });
            console.log(this.tempCategory);

            loader.present();
          })

        }



        let obj = {
          name: this.name,
          email: this.email,
          categoryChosen: this.tempCategory ,
          track:1 
        }

        //  this.navCtrl.push(MessagePage, { selectedDetails:obj})
        const loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 1000
        });
        loader.present();


        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(MessagePage, { selectedDetails: obj }).then(() => {

          setTimeout(() => {
            this.navCtrl.remove(currentIndex);
          }, 1000);


        });



      }

    } else {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'Please fill in all fields',
        buttons: ['OK']
      });
      alert.present();
    }





  }











  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }










}
