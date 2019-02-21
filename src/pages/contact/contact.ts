import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, NavParams, ActionSheetController } from 'ionic-angular';
import { ViewPage } from '../view/view';
import { InfosentPage } from '../infosent/infosent';
import { SplashPage } from '../splash/splash';
import { DatabaseProvider } from '../../providers/database/database';
import { AddContactsPage } from '../add-contacts/add-contacts';
import { MessagePage } from '../message/message';
import *as moment from 'moment';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


declare var firebase


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage   {
  categoryChosen = this.navParams.get("categoryChosen")

  date;
  contactListArray = [];
  contactDetails = {};
  msg = "Cannot create property '0' on number '0'";
  name2;
  tempArray = [] ;

  color = ["red" , "yellow", "blue"]
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public modalCtrl: ModalController, private db: DatabaseProvider, private contacts: Contacts, public actionSheetCtrl: ActionSheetController) {
    this.db.getContactlist().then((data: any) => {
      this.tempArray = data
     console.log( this.tempArray);

     // console.log(this.categoryChosen);

     for (let index = 0; index < this.tempArray.length; index++) {

      let shortname = this.tempArray[index].name.substring(1 , 0)
      console.log(shortname)
  
      let fullname = this.tempArray[index].name ;
      let email = this.tempArray[index].email ;
          
      
      let obj = {
        shortname:shortname,
        name:fullname ,
        email:email


          }

        this.contactListArray.push(obj) ;

        console.log(this.contactListArray);
        
       
     }


     


    })

    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
          tabs[key].style.display = 'none';
      });
 
  }

  

  }


  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactsPage');

    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
    


  }
  ionViewDidEnter(){
   

    
   
  }

  pikColor(){
    for (let index = 0; index < this.contactListArray.length; index++) {
      let pickColor =this.color[Math.floor(Math.random() * this.color.length)] 
      console.log(pickColor)
   document.getElementById("colorshow").style.backgroundColor=pickColor ;
    
      
    }

  }
  choosecontact() {

    console.log(name);

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select contact  ',
      buttons: [
        {
          text: 'Phone contact',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.addcontactz();
          }
        }, {
          text: 'Add contact',
          handler: () => {

            console.log('Archive clicked');



            // this.userDetails()
            console.log(this.categoryChosen);


            //this.navCtrl.push(AddContactsPage, { categoryChosen:this.categoryChosen});
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(AddContactsPage, { categoryChosen: this.categoryChosen }).then(() => {
              this.navCtrl.remove(currentIndex);
            });
          }
        },
      ]
    });
    actionSheet.present();

  }


  userDetails() {
    // this.navCtrl.push(AddContactsPage, { categoryChosen: this.categoryChosen });
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(AddContactsPage, { categoryChosen: this.categoryChosen }).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  itemSelected(name, email, date) {
    console.log(this.categoryChosen);
    if (this.msg == "Cannot create property '0' on number '0'") {

    }

    let obj = {
      name: name,
      email: email,
      date: date,
      categoryChosen: this.categoryChosen
    }
    //this.navCtrl.push(AddContactsPage, { selectedDetails: obj, categoryChosen: this.categoryChosen })
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(AddContactsPage, { selectedDetails: obj, categoryChosen: this.categoryChosen }).then(() => {
      this.navCtrl.remove(currentIndex);
    });

  }



  addcontactz() {
    this.contacts.pickContact().then((data) => {
      console.log(data);
      console.log(data.name.formatted);
      this.name2 = data.name.formatted
      console.log(data.emails[0].value);

      let a = "Cannot read property '0' of null";




      if (data.emails[0].value === a) {
        console.log("in");


        this.contactDetails = {
          name: data.name.formatted,
          email: undefined,
          track: 1
        }
        //this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen })
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen }).then(() => {
          this.navCtrl.remove(currentIndex);
        });

      } else {

        this.contactDetails = {
          name: data.name.formatted,
          email: data.emails[0].value,
          track: 1
        }

        //this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen })
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen }).then(() => {
          this.navCtrl.remove(currentIndex);
        });
      }



    }).catch((error) => {
      console.log(error.message);

      this.contactDetails = {
        name: this.name2,
        email: undefined
      }
      //this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen })
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(AddContactsPage, { getContactDetails: this.contactDetails, categoryChosen: this.categoryChosen }).then(() => {
        this.navCtrl.remove(currentIndex);
      });

    });




  }



   ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
  }



  // ionViewWillLeave() {
  //   let tabs = document.querySelectorAll('.show-tabbar');
  //   if (tabs !== null) {
  //       Object.keys(tabs).map((key) => {
  //           tabs[key].style.display = 'flex';
  //       });
   
  //   }
  // }

  
 
  // ionViewWillLeave() {
  // let tabs = document.querySelectorAll('.show-tabbar');
  // if (tabs !== null) {
  //     Object.keys(tabs).map((key) => {
  //         tabs[key].style.display = 'none';
  //     });
 
  // }
  // }

  // ngOnInit(){
  //   let tabs = document.querySelectorAll('.show-tabbar');
  //   if (tabs !== null) {
  //     Object.keys(tabs).map((key) => {
  //         tabs[key].style.display = 'none';
  //     });
 
  // }

  // }

}


