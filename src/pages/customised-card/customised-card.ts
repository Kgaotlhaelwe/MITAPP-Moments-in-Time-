import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomisedCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customised-card',
  templateUrl: 'customised-card.html',
})
export class CustomisedCardPage {
  color =["#76b39d","#ff6473","#1d97c1","#ff5959","#6e5773","#fad3cf","#ff9090","#d291bc"] ;
  canvas ;
  c ;
  colornumber = 0 ;
  showColor ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.showColor =false ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomisedCardPage');

    this.canvas = document.querySelector('canvas') ;
    this.c = this.canvas.getContext('2d')
    console.log(this.canvas);
    //this.c.fillRect(100, 100, 100, 100)

    this.c.fillStyle =`rgb(${255} , ${187} , ${153})`

    this.c.fillRect(0,0,500,700)

    // for (let i = 0; i < 61; i++) {
    //   for (let j = 0; j < 61; j++) {
    //   this.c.fillStyle =`rgb(${255} , ${187} , ${153}) `
    //     this.c.fillRect(j*20 , i*2 , 20,20,20)
    //    // this.c.clearRect(200 ,200 ,500 ,400)
       
        
    //   }
      
    // }
  }

  changeBackGroudColor(){
//     this.c.fillStyle=this.color[this.colornumber]
//  this.colornumber++ ;
//  this.c.fillRect(0,0,500,700);

console.log("clicked");

this.showColor =true ;
  }

}
