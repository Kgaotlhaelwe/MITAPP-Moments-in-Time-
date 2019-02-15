import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,PopoverController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PopoverPage } from '../popover/popover';
import {DatabaseProvider} from '../../providers/database/database';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController, private camera: Camera,public popoverCtrl: PopoverController, private db:DatabaseProvider, private network: Network , public toastCtrl: ToastController,public loadingCtrl: LoadingController ) {

   
  

    this.pet="Favourites";

    this. users= firebase.auth().currentUser;

    firebase.database().ref("user/"+this.users.uid).on('value', (data: any) => {
      var profile = data.val();
 
        console.log(profile);
        this. name = profile.name
        this. email =profile.email ;
        this.profileimage=profile.proPicture;
       })
    // firebase.database().ref("Pic/"+this.users.uid).on('value', (data: any) => {
    //   var profilepic = data.val();
    //   console.log(this.profileimage);
      


    //     this.profileimage = profilepic.url
    //     console.log("image profile");
        
    //     console.log(this.image);
        
 
    // })


   



    
  }

  save(){

      
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
    
    this.showinput =true ;
    document.getElementById("btnhide").style.display="none"
    document.getElementById("namehide").style.display="none"
  }
  

  ShareD(image, key){
console.log(key);

    const prompt = this.alertCtrl.create({
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
          alert(error);
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
  this.favouriteArray = [] ;
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
    let userID = firebase.auth().currentUser.uid;
   this.mypic = 'data:image/jpeg;base64,' + imageData;
   console.log(this.mypic);

   firebase.database().ref("user/" + userID).update({
    proPicture: this.mypic

   })



   
  }, (err) => {
  console.log(err);
  
  });
 }

}
