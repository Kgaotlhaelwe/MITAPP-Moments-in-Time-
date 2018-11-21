import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,PopoverController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PopoverPage } from '../popover/popover';
import {DatabaseProvider} from '../../providers/database/database';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

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

  profileimage ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController, private camera: Camera,public popoverCtrl: PopoverController, private db:DatabaseProvider, private network: Network , public toastCtrl: ToastController ) {

   
  

    this.pet="Favourites";

    this. users= firebase.auth().currentUser;

    firebase.database().ref("user/"+this.users.uid).on('value', (data: any) => {
      var profile = data.val();
 
        console.log(profile);
        this. name = profile.name
        this. email =profile.email ;
        this.profileimage=profile.profileimage
       })
    firebase.database().ref("Pic/"+this.users.uid).on('value', (data: any) => {
      var profilepic = data.val();
      console.log(this.profileimage);
      


        this.profileimage = profilepic.url
        console.log("image profile");
        
        console.log(this.image);
        
 
    })



    
  }

  

  ShareD(a, key){

    const prompt = this.alertCtrl.create({
      subTitle: " Please share or delete the picture" ,
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            console.log('Cancel clicked');

           this.db.deletecustomizedCard(key).then(()=>{})
           this.navCtrl.push(ProfilePage);
          }
        },
        {
          text: 'Share',
          handler: data => {
            console.log('Saved clicked');
            this.db.shareYourcut(a)

            
          }
        }
      ]
    });
    prompt.present();
  }
  
  ShareDelete(a, key){
  
    const prompt = this.alertCtrl.create({
      subTitle: " Please share or delete the picture" ,
      buttons: [
        {
          text: 'Delete',
          handler: data => {
           
            this.db.deletelikedImages(key).then(()=>{})
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
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
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
                  url: downloadURL
                };
 
                firebase
                  .database()
                  .ref("Pic/" + userID)
                  .set({
                    url: downloadURL
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

    
  
  
   
  

  update(){
    // alert(this.key)
    const prompt = this.alertCtrl.create({
      title: 'Update',
      message: "Update your username.",
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          value:this.name
        },

        

        
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
           // console.log('Saved clicked');
            console.log(data.name);

            
            var update ={
              name:data.name


            }

            // console.log(data.name);
             console.log(update);
            
            console.log(this.users.uid);
            
            return firebase.database().ref('user/'+this.users.uid).update(update);
          }
        }
      ]
    });
    prompt.present();
  }

  // displayNetworkUpdate(connectionState:string){
  //   let networkType =this.network.type
  //   this.toastCtrl.create({
  //     message:connectionState ,
  //     duration:3000 ,
  //   }).present()
   
  //  }
  
  // ionViewDidEnter() {
  //   this.network.onConnect().subscribe(data=>{
  //     console.log(data)
  //     this.displayNetworkUpdate('Connected')
     
  //    }
    
  //   ,error=>console.error(error));
     
  //    this.network.onDisconnect().subscribe(data=>{
     
  //     console.log(data)
  //     this.displayNetworkUpdate('Disconected')
  //    },error=>console.error(error));
    
  //   }
  

   ionViewDidEnter() {
    console.log('ionViewDidLoad ProfilePage');
    this.db.getlikedImage().then((data:any)=>{
      console.log(data);

      this.favouriteArray =data ;
      console.log(this.favouriteArray);

//getcustomizedCard
      this.db.getcustomizedCard().then((data:any)=>{
        console.log(data);
        this.customizedCard =data ;
        console.log(this.customizedCard);
        
        
      })
      
      
    })


     
   
    
    firebase.database().ref("customisedCard/"+this.userid).on('value', 
    (data: any) => {
      var name = data.val();
      this.customizedCard=[];
        if (name !== null) {
          var keys: any = Object.keys(name);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            let  obj = {
              key:k ,
              image:name[k].image,
              }
              
            this.customizedCard.push(obj);
            console.log(this.customizedCard);
          };
        } else{
 
        }
       

     })
  }
  
  
  
  
  
  
  
presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(PopoverPage);
  popover.present({
    ev: myEvent
  });
 }

}
