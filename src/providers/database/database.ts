import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Events } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

declare var firebase ;

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  message;
  graduationArray = [];
  weddingArray=[];
  birthdayArray=[];
  anniversaryArray=[];
  babyShowerArray=[];
  newJobArray=[];
  provider = new firebase.auth.GoogleAuthProvider();
  userID ;

  likedArray =[] ;

  messageArray =[];
  condition;
  tempTheme:string;
  customizedCardarray = []
  contactListArray = []
  private db: SQLiteObject;
  private isOpen: boolean;
  private theme: BehaviorSubject<String>;//declare
  constructor(public http: HttpClient,private fire:AngularFireAuth ,private socialSharing:SocialSharing, private networks: Network,public toastCtrl: ToastController,  public loadingCtrl: LoadingController, private storage: Storage ,  public sql: SQLite, public events: Events , private ngZone: NgZone,public alertCtrl: AlertController) {
    console.log('Hello DatabaseProvider Provider');
    storage.get('theme').then((val) => {
      console.log('Your theme', val);
      this.tempTheme = val
      console.log(this.tempTheme);
      
    });
    this.theme = new BehaviorSubject(this.tempTheme);


    if (!this.isOpen) {
      this.sql = new SQLite();
      this.sql.create({ name: "MIT.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS reviewMessage (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, image TEXT, message TEXT )", []);
        db.executeSql("CREATE TABLE IF NOT EXISTS sentMessages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, message TEXT )", []);
        db.executeSql("CREATE TABLE IF NOT EXISTS likedPictures (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT  )", []);
        db.executeSql("CREATE TABLE IF NOT EXISTS customizedCard (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT  )", []);
        
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  setAciveTheme(value){
    this.storage.set('theme', value);
    this.theme.next(value);
  }
  getActiveTheme(){ 
   
    return this.theme.asObservable();
  }

  checkstate(){
    return new Promise((resolve, reject)=>{
    this.ngZone.run(()=>{

      firebase.auth().onAuthStateChanged((user)=>
      {
       if (user != null) {
        // alert('user signed in')
        this.condition = 1
        this.userID = user.uid
        this.events.publish('user:created', this.userID, Date.now());
        console.log("got this from events",  this.userID);
        
       } else {
    
         this.condition = 0
        // alert('no user signed in')
       }
       resolve(this.condition)
     })

    })
 
 
  })
  }

  register(email , password , name, ){






    return new Promise((resolve, reject)=>{
 
      firebase.auth().createUserWithEmailAndPassword(email , password) .then(()=>{
        var uid= firebase.auth().currentUser.uid;
        firebase.database().ref("user/"+uid).set({
          name:name,
          email:email,
          proPicture: "../../assets/icon/download.png"
        })
       
 
        var user = firebase.auth().currentUser;
 
        user.sendEmailVerification().then(function() {
        // Email sent.
        }).catch(function(error) {
        // An error happened.
        });
 
 
        resolve();
 
      } , (error)=>{
        reject(error);
      });
 
   

      
 
 })
 
 
 
 
 
 }


 getUser(){
   

  return new Promise((resolve, reject)=>{
      
this.ngZone.run(()=>{

  firebase.database().ref("user/"+this.userID).on('value', (data: any) => {
    var profile = data.val();

      console.log(profile);
      var obj = {
        name :profile.name ,
        email :profile.email  ,
        profileimage:profile.proPicture

      }

      resolve(obj)
    
     })

  
})

   



  })
   


      
 }


 
 getUid(){
   return this.userID

}


updateProfileName(name){

  return new Promise((resolve, reject)=>{

    this.ngZone.run(()=>{

        
    var update = {
      name:name


    }

    
     firebase.database().ref('user/' + this.userID).update(update).then(() => {

     

    });


    })

  
    

    })


}

 login(email , password){


  
  return new Promise((resolve, reject)=>{
   this.ngZone.run(()=>{
    firebase.auth().signInWithEmailAndPassword(email , password).then((data)=>{
      console.log(data);
      
      resolve(data);
    }, Error =>{
      reject(Error)
    }) 

   })
   ;
  
   
})


}


loginx(email , password){
 
  return firebase.auth().signInWithEmailAndPassword(email, password) ;
}




forgetPassword(email){

  return new Promise((resolve, reject)=>{
    firebase.auth().sendPasswordResetEmail(email) .then(()=> {

      resolve();
    } , (error)=>{
      reject(error)

    })
    

})

}


saveContactList(name , email,date){
  var users= firebase.auth().currentUser;
  var userid=users.uid

  return new Promise((resolve, reject)=>{
    firebase.database().ref('contactList/'+ userid).push({
      name:name ,
      email:email,
      date:date
      
 
      
    })
 
    resolve();
 
 })
}


getContactlist(){
  var users= firebase.auth().currentUser;
  var userid=users.uid
  
  return new Promise((resolve, reject)=>{
    firebase.database().ref("contactList/"+userid).on('value', (data: any) => {

      var contactList = data.val();
       console.log(data.val());
       if(contactList !=null){

        this.contactListArray = []

        var keys: any = Object.keys(contactList);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           k:k,
           name:contactList[k].name ,
           email:contactList[k].email ,
           date:contactList[k].date ,
  
         }
         //this.likedArray = [];
        this.contactListArray.push(obj)
 
        resolve( this.contactListArray);
 
         
   }
       }else{
        //  alert("YOU DONT FAV MESSAGE") ;
       }
 
      
 })

 })
}

SignWithGoogle(){
  var users= firebase.auth().currentUser;
  this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

   return firebase.auth().signInWithPopup(this.provider).then((result) =>{
    // This gives you a Google Access Token. You can use it to access the Google API.
   

      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var res =result.user.displayName.split(" ")
      console.log(user);

      firebase.database().ref("user/"+ users.uid).set({
        email:user.email ,
        username:user.displayName  ,
        name:{
          first:res[0],
          middle:res[1] ,
          last:res[2]
        }
      })
    
   
    
    
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.d
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  

}

logInWithFaceBook(){
  this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res=>{
    console.log(res);
 
  })
 
 }





deletePic(key){
  return new Promise((resolve, reject)=>{
    console.log(this.userID);
    
    firebase.database().ref('likedPictures/' + this.userID).child(key).remove();
  })
 
}


temporaryliked(message){
  var users= firebase.auth().currentUser;
  var userid=users.uid
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'General').push({
 
 
      message:message ,
 
    })
 
    resolve();
 
 })
}










sendviaWhatsApp(message, url){

  return new Promise((resolve, reject)=>{
    this.socialSharing.share(message , null ,null, url).then(()=>{
   
    resolve()

    } , (error)=>{
      reject(error)
  
    })
  
  
  })
}

saveReviewMessages(name,message , date, image){
  var users= firebase.auth().currentUser;
  var userid=users.uid
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref("ReviewMessage/"+userid).push({
      name:name ,
      
      message:message ,
      date:date,
      image:image
      
    })

    resolve();

})

}


likedMessage(message){
  var users= firebase.auth().currentUser;
  var userid=users.uid
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref("likedPictures/"+userid).push({
      
      
      message:message ,
      
    })

    resolve();

})

}


sentMessage(message,name,date){
  var users= firebase.auth().currentUser;
  var userid=users.uid
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref("sentMessage/"+userid).push({
      
      
      message:message ,
      date:date ,
      name:name,
    
      
    })

    resolve();

})

}

customizedCard(image) {
  var users= firebase.auth().currentUser;
  var userid=users.uid
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref("customisedCard/"+userid).push({
      
      
      image:image ,
   })

    resolve();

})

}

getMessages(){

  const loader = this.loadingCtrl.create({
    content: "Please wait... still connecting",
    cssClass: "loading-md .loading-wrapper ",
    //duration :30000
  
  });
  loader.present();
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'Cards' ).on('value', (data: any) => {
 
      var message = data.val();
       console.log(data.val());
 
       var keys: any = Object.keys(message);
 
       console.log(keys);
 
       for (var i = 0; i < keys.length; i++){
        var k = keys[i];
 
        let obj = {
          k:k,
          message:message[k].message
 
        }
        this.messageArray.push(obj)
 
        resolve(this.messageArray);
         loader.dismiss();
  }
 
 
  })
 
 })
 
 }

sendviaWhatsApps(message){

  return new Promise((resolve, reject)=>{
    this.socialSharing.share(null,null,message,null)
     resolve()
     
      
  
   
    })
  }
  




sendviaFacebook(message, url){
  return new Promise((resolve, reject)=>{
    this.socialSharing.shareVia(message, null , null)
     resolve(message)
     
      
  
   
  
    
  })
  
  
}

sendViaemail(message){
  return new Promise((resolve, reject)=>{
    this.socialSharing.share(message, null , null)
     resolve(message)
     
      
  
    
  })

  

}

shareYourfav(message){
  return new Promise((resolve, reject)=>{
    this.socialSharing.share(message)
     resolve(message)
     
      
  
    
  })

  

}

shareYourcut(message){
  return new Promise((resolve, reject)=>{
    this.socialSharing.share(null,null,message,null)
     resolve(message)
     
      
  
    
  })

  

}

uploadProfilePic(){
  return new Promise((resolve, reject)=>{

    
  })

}


getFavouriteImages(){
  var users= firebase.auth().currentUser;
  var userid=users.uid
  
  return new Promise((resolve, reject)=>{
    firebase.database().ref("likedPictures/"+userid).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
       if(message !=null){

        this.likedArray = []

        var keys: any = Object.keys(message);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           k:k,
           message:message[k].message
  
         }
         //this.likedArray = [];
        this.likedArray.push(obj)
 
        resolve(this.likedArray);
 
         
   }
       }else{
        //  alert("YOU DONT FAV MESSAGE") ;
       }
 
      
 })

 })


 

 
  

}




getReviewMessage(){
  var users= firebase.auth().currentUser;
  var userid=users.uid
  
  return new Promise((resolve, reject)=>{
    firebase.database().ref("ReviewMessage/"+userid).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
       if(message !=null){
        this.likedArray = []


        var keys: any = Object.keys(message);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           k:k ,
           message:message[k].message,
           date:message[k].date ,
           image:message[k].image ,
           name:message[k].name
  
         }
        this.likedArray.push(obj)
 
        resolve(this.likedArray);
 
         
   }
       }else{
        //  alert("YOU DONT FAV MESSAGE") ;
       }
 
      
 })

 })
  

}


testNumbers(x, y, z){
  
    return x + y + z;


}

getsentMessage(){
  var users= firebase.auth().currentUser;
  var userid=users.uid
  
  return new Promise((resolve, reject)=>{
    firebase.database().ref("sentMessage/"+userid).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
       if(message !=null){
        this.likedArray = [] ;
        var keys: any = Object.keys(message);
 
      //  console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           key:k ,
           message:message[k].message ,
           name:message[k].name ,
           date:message[k].date
  
         }
        this.likedArray.push(obj)
 
        resolve(this.likedArray);
 
         
   }
       }else{
        //  alert("YOU DONT FAV MESSAGE") ;
       }
 
      
 })

 })
  
}
signout(){
  firebase.auth().signOut().then(function() {
  }).catch(function(error) {
    // An error happened.
  });
}

savetoSentMessage(message,a,name){
  
  var users= firebase.auth().currentUser;
  var userid=users.uid
  return new Promise((resolve, reject)=>{
    
    firebase.database().ref("savetoSentMessage/"+userid).push({
 
 
      message:message ,
      
      date:a ,
      name:name ,
     
 
    })
 
    resolve();
 
 })
 
 }



 getCustomisedCard(){
  return new Promise((resolve, reject)=>{

    var users= firebase.auth().currentUser;
    var userid=users.uid
    firebase.database().ref("customisedCard/"+userid).on('value', 
    (data: any) => {
      var name = data.val();
      this.customizedCardarray = []
        if (name !== null) {
          var keys: any = Object.keys(name);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            let  obj = {
              key:k ,
              image:name[k].image,
              }
              
            this.customizedCardarray.push(obj);
            console.log(this.customizedCardarray);
          resolve(this.customizedCardarray)
          }
        } else{
 
        }
       

     })
  })
 }



 

 
 displayNetworkUpdate(connectionState:string){
  let networkType =this.networks.type
  this.toastCtrl.create({
    message:`YOU ARE NOW`+connectionState +'via'+networkType ,
    duration:3000 ,
  }).present()
 
 }
 
 network(){

   return new Promise((resolve, reject)=>{

    this.networks.onConnect().subscribe(data=>{
      console.log(data)
      this.displayNetworkUpdate(data.type)
     
     }
    
    ,error=>console.error(error));
     
     this.networks.onDisconnect().subscribe(data=>{
     
      console.log(data)
      this.displayNetworkUpdate(data.type)
     },error=>console.error(error));
    resolve();
   
  })
 }
 

// reviewMessage
creatReviewMessage( name:string, image:string, message:string){
  return new Promise ((resolve, reject) => {
    let sql = "INSERT INTO  reviewMessage (name, image, message) VALUES (?, ?, ?)";
    this.db.executeSql(sql, [ name, image, message ]).then((data) =>{
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}



creatSentessage( name:string, date:string, message:string){
  return new Promise ((resolve, reject) => {
    let sql = "INSERT INTO  sentMessages (name, date, message) VALUES (?, ?, ?)";
    this.db.executeSql(sql, [ name, date, message ]).then((data) =>{
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}



creatlikeImage( image){
  return new Promise ((resolve, reject) => {
    let sql = "INSERT INTO  likedPictures (image) VALUES (?)";
    this.db.executeSql(sql, [ image]).then((data) =>{
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}

creatcustomisedCard( image){
  return new Promise ((resolve, reject) => {
    let sql = "INSERT INTO customizedCard (image) VALUES (?)";
    this.db.executeSql(sql, [ image]).then((data) =>{
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}


getReviewMessages(){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("SELECT * FROM reviewMessage", []).then((data) => {
      let arrayReviewMessage = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          arrayReviewMessage.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            image: data.rows.item(i).image,
         
            message: data.rows.item(i).message,
           
          });            
        }          
      }
      resolve( arrayReviewMessage);
    }, (error) => {
      reject(error);
    })
  })
}



getlikedImage(){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("SELECT * FROM likedPictures", []).then((data) => {
      let arrayReviewMessage = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          arrayReviewMessage.push({
            id: data.rows.item(i).id,
            
            image: data.rows.item(i).image,
         
          
           
          });            
        }          
      }
      resolve( arrayReviewMessage);
    }, (error) => {
      reject(error);
    })
  })
}




getSentMessage(){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("SELECT * FROM sentMessages", []).then((data) => {
      let arrayReviewMessage = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          arrayReviewMessage.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            date: data.rows.item(i).date,
         
            message: data.rows.item(i).message,
           
          });            
        }          
      }
      resolve( arrayReviewMessage);
    }, (error) => {
      reject(error);
    })
  })
}


getcustomizedCard(){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("SELECT * FROM customizedCard", []).then((data) => {
      let arrayReviewMessage = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          arrayReviewMessage.push({
            id: data.rows.item(i).id,
            image: data.rows.item(i).image,
         
           
          });            
        }          
      }
      resolve( arrayReviewMessage);
    }, (error) => {
      reject(error);
    })
  })
}






deleteReviewMessage(id){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("DELETE FROM reviewMessage where id=?", [id]).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    })
  });
}



deleteSentMessage(id){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("DELETE FROM sentMessages where id=?", [id]).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    })
  });
}


deletelikedImages(id){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("DELETE FROM likedPictures where id=?", [id]).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    })
  });
}


deletecustomizedCard(id){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("DELETE FROM customizedCard where id=?", [id]).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    })
  });
}

updateReviewMessage(message, id){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("UPDATE  reviewMessage SET message=?   WHERE id=?", [message, id]).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    })
  });
}

scheduleEmails(occassion, date,emailto,message, namefrom, uniquedate){
  var users= firebase.auth().currentUser;
 var uid  = users.uid
 var userEmail = users.email;
  return new Promise((resolve, reject)=>{
    firebase.database().ref("scheduledEmails/"+uid).push({
      email:userEmail ,
      date:date,
      emailto:emailto ,
      occassion:occassion ,
      message:message ,
      namefrom:namefrom ,
      uniquedate:uniquedate
    })
 
    resolve();
 
 })

}

scheduleEmailForFunction(occassion, date,emailto,message, namefrom, uniquedate){
  var users= firebase.auth().currentUser;
  var userEmail = users.email;
  return new Promise((resolve, reject)=>{
    firebase.database().ref("schedulefunctionEmail/").push({
      email:userEmail ,
      date:date,
      emailto:emailto ,
      occassion:occassion ,
      message:message ,
      namefrom:namefrom,
      uniquedate:uniquedate
    })
 
    resolve();
 
 })
 
 }



 getScheduledEmails(){
  var users= firebase.auth().currentUser;
  var userid=users.uid
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref("scheduledEmails/"+userid).on('value', (data: any) => {
 
      var contactList = data.val();
       console.log(data.val());
       if(contactList !=null){
 
        this.contactListArray = []
 
        var keys: any = Object.keys(contactList);
 
        console.log(keys);
 
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
 
         let obj = {
           k:k,
           emailto:contactList[k].emailto ,
 
           occassion:contactList[k].occassion ,
           message:contactList[k].message ,
           uniquedate:contactList[k].uniquedate
 
         }
         //this.likedArray = [];
        this.contactListArray.push(obj)
 
        resolve( this.contactListArray);
 
 
   }
       }else{
        //  alert("YOU DONT FAV MESSAGE") ;
        }
 
 
 })
 
 })
 
 }




 getScheduledFunctionEmails(){
  var users= firebase.auth().currentUser;
  var userid=users.uid
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref("schedulefunctionEmail/").on('value', (data: any) => {
 
      var contactList = data.val();
       console.log(data.val());
       if(contactList !=null){
 
        this.contactListArray = []
 
        var keys: any = Object.keys(contactList);
 
        console.log(keys);
 
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
 
         let obj = {
           k:k,
           uniquedate:contactList[k].uniquedate ,
 
 
 
         }
         //this.likedArray = [];
        this.contactListArray.push(obj)
 
        resolve( this.contactListArray);
 
 
   }
       }else{
        //  alert("YOU DONT FAV MESSAGE") ;
        }
 
 
 })
 
 })
 
 }

 getFavourite(){
  return new Promise((resolve, reject)=>{

    firebase.database().ref("likedPictures/").on('value', (data: any) => {
 
      var contactList = data.val();
       console.log(data.val());
       if(contactList !=null){
 
        this.likedArray= []
 
        var keys: any = Object.keys(contactList);
 
        console.log(keys);
 
        for (var i = 0; i < keys.length-2; i++){
         var k = keys[i];
 
         let obj = {
           k:k,
         
          message:contactList[k].message,
 
 

         }
         
        this.likedArray.push(obj) ;
        console.log(this.likedArray);
        
 
        resolve( this.likedArray);
 
 
   }
       }else{
      
        }
 
 
 })


  })


 }
 
 errorAlert(message){
 
 }

 showAlert(title , message) {
  const alert = this.alertCtrl.create({
    cssClass: "myAlert",
    title: title,
    subTitle:message,
    buttons: ['OK']
  });
  alert.present();
}

}