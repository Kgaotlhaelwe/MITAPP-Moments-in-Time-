import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,PopoverController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PopoverPage } from '../popover/popover';
import {DatabaseProvider} from '../../providers/database/database';

declare var firebase ;

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  pet;
  key ;
  users ;
  url ;

  profileimage ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController, private camera: Camera,public popoverCtrl: PopoverController, private db:DatabaseProvider ) {

   
  

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

  ShareDelete(a, key){
  
    const prompt = this.alertCtrl.create({
      subTitle: " Share or delete" ,
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            console.log('Cancel clicked');

            var users= firebase.auth().currentUser;
            var userid=users.uid
    
            this.favouriteArray=[]
          firebase.database().ref('likedPictures/'+userid).child(key).remove();
          }
        },
        {
          text: 'Share',
          handler: data => {
            console.log('Saved clicked');
            this.db.shareYourfav(a)

            
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
          alert("error !!1");
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
 
      //});
    }
  }

    
  
  
   
  

  update(){
    // alert(this.key)
    const prompt = this.alertCtrl.create({
      title: 'UPDATE',
      message: "Update your Details",
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
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
            console.log('Saved clicked');

            var update ={
              name:data.name

            }

            return firebase.database().ref('user/'+this.userid).update(update);
          }
        }
      ]
    });
    prompt.present();
  }


  

   ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    var users= firebase.auth().currentUser;
    this. userid=users.uid
    
    firebase.database().ref("likedPictures/"+this.userid).on('value', 
    (data: any) => {
      var name = data.val();
      this.favouriteArray=[];
        if (name !== null) {
          var keys: any = Object.keys(name);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            let  obj = {
              key:k ,
              message:name[k].message,
              }
              
            this.favouriteArray.push(obj);
            console.log(this.favouriteArray);
          };
        } else{
 
        }
       

     })
  }
  
  
  
  
  
  async takeApic(){

    try {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      const result = await this.camera.getPicture(options);
      const image = 'data:image/jpeg;'+result;
     
      const pictures  = firebase.storage().ref("profile/" );
      pictures.putString(image, 'data_url')
  
    
  
      
    } catch (error) {
      console.log(error);
      
      
    }
    
  }
  
presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(PopoverPage);
  popover.present({
    ev: myEvent
  });
 }

}
