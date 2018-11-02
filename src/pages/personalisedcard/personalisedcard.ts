import { Component,ViewChild,ElementRef ,Renderer  } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database' ;
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the PersonalisedcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personalisedcard',
  templateUrl: 'personalisedcard.html',
})
export class PersonalisedcardPage {
  file: any;
  storeImage = []
    
  @ViewChild('myCanvas') canvas: any;
  
  canvasTextWrapper:any
  canvasElement: any;
  lastX: number;
  lastY: number;

  currentColour: string = '#1abc9c';
  availableColours: any;

  brushSize: number = 10;
  colornumber = 0 ;
  textz ;
  color =["#76b39d","#ff6473","#1d97c1","#ff5959","#6e5773","#fad3cf","#ff9090","#d291bc"] ;
  fontfamily = ['Comic Sans MS','Courier New','cursive'] ;
  fontSize = ["14px","20px"];

  fontfamilynumber = 0 ;
  ctx ;
  
  constructor(public navCtrl: NavController,  public storage: Storage, public toastCtrl: ToastController,public navParams: NavParams,  private db:DatabaseProvider,public platform: Platform, public renderer: Renderer) {
 
    this.availableColours = [
      '#1abc9c',
      '#3498db',
      '#9b59b6',
      '#e67e22',
      '#e74c3c'
  ];
 
 
  }
  
 
  ngAfterViewInit(){
    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
    
    let tabs = document.querySelectorAll('.show-tabbar');
      if (tabs !== null) {
          Object.keys(tabs).map((key) => {
              tabs[key].style.display = 'none';
          });
      }
}

changeColour(colour){
    this.currentColour = colour;
}

changeSize(size){
    this.brushSize = size;
}

handleStart(ev){

    this.lastX = ev.touches[0].pageX ;
    this.lastY = ev.touches[0].pageY ;
    
}

handleMove(ev){
    var canvasPosition = this.canvasElement
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.lineJoin = "round";
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;

    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;



}
// text(){      
// let c = document.getElementById("myCanvas");
// var ctx = this.canvasElement.getContext("2d");
// ctx.fillStyle = 'black';
// ctx.font=' bold 30px cursive'


// ctx.font = this.fontfamily[this.fontfamilynumber];

// this.fontfamilynumber++ ;

// ctx.fillText(this.textz, 90,300);
// }

myObj =  {
    'float' : 'right',
    'color' : 'red',
   "background-color" : "coral",
   "font-size" : "60px",
   "padding" : "50px"
 }


 text(txt, x, y, maxWidth, fontSize, fontFace){

    var canvas = document.getElementById("myCanvas");
    var ctx = this.canvasElement.getContext("2d");
    //var ox = this.canvasElement.width;
    //var oy = this.canvasElement.height;
    //ctx.font = "42px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.translate(0,40);
    ctx.font = " bold 25px cursive";
   
    var firstY = y;
     var line= ''
     var words = this.textz.split(' ')
     var lineHeight=fontSize*2
     var x = this.canvasElement.width
     var y = this.canvasElement.height
     
     ctx.font=fontSize+" "+fontFace;
     ctx.textAlign = "center";
     ctx.textBaseline='middle';
    
     for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if(testWidth > x) {
            
            ctx.fillText(line, this.canvasElement.width/2, 300,);
           if(n<words.length-1){
               line = words[n] + ' ';
               x += lineHeight;
           }
         }
         else {
           line = testLine;
         }
       }
        ctx.fillText(line, this.canvasElement.width/2, 320,this.canvasElement.width);
    
    console.log(line)
    console.log(words);
    console.log(words.length);
    console.log(maxWidth);
    console.log(this.myObj.color);
    console.log(lineHeight);
    console.log(metrics);
    console.log(testLine);
    console.log(testWidth);
    console.log(y);
    console.log(x);
    
    }


text1(){
    this.canvasTextWrapper(this.canvas.nativeElement, this.fontfamilynumber, {
        textAlign: "center",
        verticalAlign: "middle",
        sizeToFill: true,
        paddingX: 10,
        paddingY: 30,
    
    });
}

font(){
    let c = document.getElementById("myCanvas");
    var ctx = this.canvasElement.getContext("2d");

    ctx.font = this.fontfamily[this.fontfamilynumber];

 this.fontfamilynumber++ ;

 

}

fontsize(){
    let c = document.getElementById("myCanvas");
    var ctx = this.canvasElement.getContext("2d");

    ctx.fontSize ="30px"
    this.fontfamilynumber++ ;


}


clearCanvas(){
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
}
savePad() {
let test =  this.canvasElement = this.canvas.nativeElement.toDataURL();
this.db.customizedCard(test).then(()=>{
    //this.signaturePad.clear();
    let toast = this.toastCtrl.create({
      message: 'image saved, please check profile to share the image.',
      duration: 3000
    });
    toast.present();
  
   
})
console.log(test);

}

back(){
 var c=this.canvasElement = this.canvas.nativeElement;
 this.ctx=this.canvasElement.getContext("2d");

if(this.color.length == this.colornumber){
   
    
        this.color.splice(0,this.color.length);
        console.log(this.color);
        this.color =["#76b39d","#ff6473","#1d97c1","#ff5959","#6e5773","#fad3cf","#ff9090","#d291bc"];
        this.colornumber =0
    
     }
    
 console.log(this.color[this.colornumber]);
 
 this.ctx.fillStyle=this.color[this.colornumber]
 this.colornumber++ ;
 this.ctx.fillRect(0,0,500,700);



 if(this.color.length == this.colornumber){
console.log("in");

    this.color.splice(0,this.color.length);
    console.log(this.color);
    this.color =["#76b39d","#ff6473","#1d97c1","#ff5959","#6e5773","#fad3cf","#ff9090","#d291bc"];
    this.colornumber =0

 }


   
}



  // ngAfterViewInit() {
  //   let tabs = document.querySelectorAll('.show-tabbar');
  //   if (tabs !== null) {
  //       Object.keys(tabs).map((key) => {
  //           tabs[key].style.display = 'none';
  //       });
  //   }
  // }

  ionViewWillLeave() {
  let tabs = document.querySelectorAll('.show-tabbar');
  if (tabs !== null) {
      Object.keys(tabs).map((key) => {
          tabs[key].style.display = 'flex';
      });

  }
}

}





