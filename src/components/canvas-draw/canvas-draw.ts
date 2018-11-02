import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {DatabaseProvider} from '../../providers/database/database' ;


@Component({
 selector: 'canvas-draw',
 templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {
    file: any;
    storeImage = []
    
   @ViewChild('myCanvas') canvas: any;
  

   canvasElement: any;
   lastX: number;
   lastY: number;

   currentColour: string = '#1abc9c';
   availableColours: any;

   brushSize: number = 10;
   colornumber = 0 ;
   textz ;

   constructor(public platform: Platform, public renderer: Renderer, private db :DatabaseProvider) {
       console.log('Hello CanvasDraw Component');

       this.availableColours = [
           '#1abc9c',
           '#3498db',
           '#9b59b6',
           '#e67e22',
           '#e74c3c'
       ];
     
   }

//    ngAfterViewInit(){

//        this.canvasElement = this.canvas.nativeElement;

//        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
//        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

//    }

//    changeColour(colour){
//        this.currentColour = colour;
//    }

//    changeSize(size){
//        this.brushSize = size;
//    }

//    handleStart(ev){

//        this.lastX = ev.touches[0].pageX;
//        this.lastY = ev.touches[0].pageY;
       
//    }

//    handleMove(ev){

//        let ctx = this.canvasElement.getContext('2d');
//        let currentX = ev.touches[0].pageX;
//        let currentY = ev.touches[0].pageY;

//        ctx.beginPath();
//        ctx.lineJoin = "round";
//        ctx.moveTo(this.lastX, this.lastY);
//        ctx.lineTo(currentX, currentY);
//        ctx.closePath();
//        ctx.strokeStyle = this.currentColour;
//        ctx.lineWidth = this.brushSize;
//        ctx.stroke();

//        this.lastX = currentX;
//        this.lastY = currentY;

 

//    }
//  text(){      
// let c = document.getElementById("myCanvas");
//  var ctx = this.canvasElement.getContext("2d");
//  ctx.fillStyle = 'blue';
// ctx.font = "50px Verdana";
// ctx.fillText(this.textz, 10, 90);
//    }


//    clearCanvas(){
//        let ctx = this.canvasElement.getContext('2d');
//        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
//    }
//    savePad() {
//   let test =  this.canvasElement = this.canvas.nativeElement.toDataURL();
//   this.db.customizedCard(test).then(()=>{
      
//   })
//   console.log(test);
  
//    }

//    back(){
//     var c=document.getElementById("myCanvas");
//     var ctx=this.canvasElement.getContext("2d");
//     var color =["red", "yellow","black"];
//     console.log(color[this.colornumber]);
    
//     ctx.fillStyle=color[this.colornumber]
//     this.colornumber++ ;
//     ctx.fillRect(0,0,500,700);

 
      
//    }

}
