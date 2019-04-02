import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var firebase ;


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  relationship ;
  message ;
url ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }


  insertpic(event){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(this.url);


        
        
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      let selectedfile = event.target.files[0];

  }

  }


  send(){
    

    firebase.database().ref('category/' + this.relationship).push({

      message :this.url
   

    });

  }


  


}
