import { Component , ViewChild } from '@angular/core';
 import { IonicPage, NavController, NavParams ,AlertController,PopoverController,Keyboard} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PopoverPage } from '../popover/popover';
import {DatabaseProvider} from '../../providers/database/database';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AngularCropperjsComponent } from 'angular-cropperjs';
// import { Keyboard } from '@ionic-native/keyboard';
declare var firebase ;

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name ;
  email;
  image
  userid ;
  favouriteArray =[];
  customizedCard = [] ;
  pet;
  key ;
  users ;
  url ;
  showinput:boolean ;
  hide:boolean ;
  updatename ;

  profileimage ;
  mypic ;


  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
  cropperOptions: any;
  croppedImage = null;
 
  myImage = null;
  scaleValX = 1;
  scaleValY = 1;
  myprofilepic:boolean ;
  mycropmagez :boolean ;
  showbtn:boolean ;
  showuploadbtn:boolean ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController, private camera: Camera,public popoverCtrl: PopoverController, private db:DatabaseProvider, private network: Network , public toastCtrl: ToastController,public loadingCtrl: LoadingController, private keyboard: Keyboard ) {
  //   this.myprofilepic =true ;
  //   this.mycropmagez = false ; 
  //   this.showbtn =false ;
  //  this.showuploadbtn =true ;
  //   this.cropperOptions = {
  //     dragMode: 'crop',
  //     aspectRatio: 1,
  //     autoCrop: true,
  //     movable: true,
  //     zoomable: true,
  //     scalable: true,
  //     autoCropArea: 0.8,
  //   };

    this.pet="Favourites";

    this. users= firebase.auth().currentUser;

    firebase.database().ref("user/"+this.users.uid).on('value', (data: any) => {
      var profile = data.val();
 
        console.log(profile);
        this. name = profile.name
        this. email =profile.email ;
        this.profileimage=profile.proPicture;
       })
   
 
   }

  save(){
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'flex';
        });
      }
      
    var update ={
      name:this.updatename 
}

      
    return firebase.database().ref('user/'+this.users.uid).update(update).then(()=>{
      this.showinput =false ;
      document.getElementById("btnhide").style.display="block"
      document.getElementById("namehide").style.display="block"
    });


    


  }


  edit(){
    // this.keyboard.show();
    this.showinput =true ;
    document.getElementById("btnhide").style.display="none"
    document.getElementById("namehide").style.display="none"
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
  }
  

  ShareD(image, key){
console.log(key);

    const prompt = this.alertCtrl.create({
      cssClass: "myAlert",
      subTitle: "Would you like to share or delete the picture" ,
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            console.log('Cancel clicked');

          // this.db.deletecustomizedCard(key).then(()=>{})
          console.log(key);
          //customisedCard
          console.log(this.users.uid);
          console.log(key);
          
          

          firebase.database().ref('customisedCard/'+this.users.uid).child(key).remove();
           this.navCtrl.push(ProfilePage);
          }
        },
        {
          text: 'Share',
          handler: data => {
            console.log('Saved clicked');
            this.db.shareYourcut(image)

            
          }
        }
      ]
    });
    prompt.present();
  }
  
  ShareDelete(a, key){
  
    const prompt = this.alertCtrl.create({
      cssClass: "myAlert",
      subTitle: " Would you like to share or delete the picture  " ,
      buttons: [
        {
          text: 'Delete',
          handler: data => {
           
            //this.db.deletelikedImages(key).then(()=>{})
            console.log(key);
            
            firebase.database().ref('likedPictures/'+this.users.uid).child(key).remove();

            this.navCtrl.push(ProfilePage);
          }
        },
        {
          text: 'Share',
          handler: data => {
            console.log('Saved clicked');
            this.db.sendviaWhatsApps(a)

            
          }
        }
      ]
    });
    prompt.present();
  }
  
  upload(event: any) {


    

  
   
 if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.profileimage = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);0
      let selectedfile = event.target.files[0];
      let filename = selectedfile.name;
     
    
 
      let storageRef = firebase.storage().ref("profilepic/" + filename);
 
      let metadata = { contentType: "image/jpeg", size: 0.75 };
      let uploadTask = storageRef.put(selectedfile, metadata);
 
     
      uploadTask.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          // Handle unsuccessful uploads
          // alert(error);
        },
        function () {
          // Handle successful uploads on complete
 
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
 
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("User has sign in");
                let userID = firebase.auth().currentUser.uid;
                let obj = {
                  cover: downloadURL
                };
 
                firebase
                  .database()
                  .ref("user/" + userID)
                  .update({
                    proPicture: downloadURL
                  },(error)=>{
                    if (error) {
                    
                    } else {
                    
                    }
                  });
 
                console.log(userID);
              } else {
                console.log("User has not sign in");
              }
            });
          });
        }
      );
 
      }
  }

    
  
  
   
  

 
  

   ionViewDidEnter() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(' ProfilePage');


this.db.getCustomisedCard().then((data:any)=>{
  console.log(data);

  this.customizedCard = data ;

  console.log(this.customizedCard);
  
  
})


this.db.getFavouriteImages().then((data:any)=>{
  console.log(data);
 // this.favouriteArray = [] ;
  this.favouriteArray=data
})

     
   
   
  }
  
  
  
  
  
  
  
presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(PopoverPage);
  popover.present({
    ev: myEvent
  });
 }


 uploadImage(){


   const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:false
  }
  
  this.camera.getPicture(options).then((imageData) => {
    this.myprofilepic =false
    
   this.mypic = 'data:image/jpeg;base64,' + imageData;
   console.log(this.mypic);
  //  this.showbtn =true ;
  //  this.mycropmagez = true ;
  //  this.showuploadbtn =false ;
  let userID = firebase.auth().currentUser.uid;
  firebase.database().ref("user/" + userID).update({
    proPicture:this.mypic,

   })
  



   
  }, (err) => {
  console.log(err);
  
  });




  
 }
 tabcheck(){
 
   
 }




 zoom(zoomIn: boolean) {
  let factor = zoomIn ? 0.1 : -0.1;
  this.angularCropper.cropper.zoom(factor);
}

scaleX() {
  this.scaleValX = this.scaleValX * -1;
  this.angularCropper.cropper.scaleX(this.scaleValX);
}

scaleY() {
  this.scaleValY = this.scaleValY * -1;
  this.angularCropper.cropper.scaleY(this.scaleValY);
}

move(x, y) {
  this.angularCropper.cropper.move(x, y);
}

// savez() {
//   console.log("clicked");
  
//   let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
//   this.croppedImage = croppedImgB64String;
 
  
//    this.showbtn =false ;
//    this.myprofilepic =true ;
//    this.mycropmagez = false ;
//    this.showuploadbtn =true ; 

//   console.log(this.croppedImage) ;

// }


reset() {
  this.angularCropper.cropper.reset();
}

clear() {
  this.angularCropper.cropper.clear();
}

rotate() {
  this.angularCropper.cropper.rotate(90);
}

}
