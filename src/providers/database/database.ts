import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
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

  likedArray =[] ;

  messageArray =[];
  condition;
  tempTheme:string;

  private db: SQLiteObject;
  private isOpen: boolean;
  private theme: BehaviorSubject<String>;//declare
  constructor(public http: HttpClient,private fire:AngularFireAuth ,private socialSharing:SocialSharing, private networks: Network,public toastCtrl: ToastController,  public loadingCtrl: LoadingController, private storage: Storage ,  public sql: SQLite) {
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
    firebase.auth().onAuthStateChanged((user)=>
     {
      if (user != null) {
       // alert('user signed in')
       this.condition = 1
   
      } else {
   
        this.condition = 0
       // alert('no user signed in')
      }
      resolve(this.condition)
    })
 
  })
  }

  register(email , password , name, image){


 
 
    return new Promise((resolve, reject)=>{

      firebase.auth().createUserWithEmailAndPassword(email , password) .then(()=>{
        var uid= firebase.auth().currentUser.uid;
        firebase.database().ref("user/"+uid).set({
          name:name,
          email:email,
 
 
        }).then(()=>{
 
          firebase
          .database()
          .ref("Pic/"+uid)
          .set({
            url: "../../assets/icon/download.png"
          });
        })
 
 
 
 
        resolve();
 
      } , (error)=>{
        reject(error);
      });
 
 
 })
 
 }

 login(email , password){

  
  return new Promise((resolve, reject)=>{
    firebase.auth().signInWithEmailAndPassword(email , password).then(()=>{
      resolve();
    }, Error =>{
      reject(Error)
    }) ;
  
   
})


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


 anniversaryMessage(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'ANNIVERSARY' ).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
 
       var keys: any = Object.keys(message);
 
       console.log(keys);
 
       for (var i = 0; i < keys.length; i++){
        var k = keys[i];
 
        let obj = {
          k:keys ,
          message:message[k].message
 
        }
        this.anniversaryArray.push(obj)

        resolve(this.anniversaryArray);
  }
 
 
  })

 })
  

 }

birthdayMessages(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'Birthday' ).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
 
       var keys: any = Object.keys(message);
 
       console.log(keys);
 
       for (var i = 0; i < keys.length; i++){
        var k = keys[i];
 
        let obj = {
          k:keys ,
          message:message[k].message
 
        }
        this.birthdayArray.push(obj)

        resolve(this.birthdayArray);
  }
 
 
  })

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
babyShowerMessages(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'babyShower' ).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
 
       var keys: any = Object.keys(message);
 
       console.log(keys);
 
       for (var i = 0; i < keys.length; i++){
        var k = keys[i];
 
        let obj = {
          k:keys ,
          message:message[k].message
 
        }
        this.babyShowerArray.push(obj)

        resolve(this.babyShowerArray);
  }
 
 
  })

 })
  


}


GraduationMessages(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'Graduation' ).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
 
       var keys: any = Object.keys(message);
 
       console.log(keys);
 
       for (var i = 0; i < keys.length; i++){
        var k = keys[i];
 
        let obj = {
          k:keys ,
          message:message[k].message
 
        }
        this.graduationArray.push(obj)

        resolve(this.graduationArray);
  }
 
 
  })

 })
  



}

weddingMessage(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'Weddings' ).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
 
       var keys: any = Object.keys(message);
 
       console.log(keys);
 
       for (var i = 0; i < keys.length; i++){
        var k = keys[i];
 
        let obj = {
          k:keys ,
          message:message[k].message
 
        }
        this.weddingArray.push(obj)

        resolve(this.weddingArray);
  }
 
 
  })

 })
  

}

newJobMessage(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'newJob' ).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
 
       var keys: any = Object.keys(message);
 
       console.log(keys);
 
       for (var i = 0; i < keys.length; i++){
        var k = keys[i];
 
        let obj = {
          k:keys ,
          message:message[k].message
 
        }
        this.newJobArray.push(obj)

        resolve(this.newJobArray);
  }
 
 
  })

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

saveSentMessages(name,message , date, image){
  var users= firebase.auth().currentUser;
  var userid=users.uid
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref("messagesent/"+userid).push({
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


Testing(message,name,date){
  var users= firebase.auth().currentUser;
  var userid=users.uid
 
  return new Promise((resolve, reject)=>{
    firebase.database().ref("Testingmsg/"+userid).push({
      
      
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
    content: "Please wait... still connecting ",
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
          k:keys ,
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
    this.socialSharing.share(message,null,null,null)
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


getFavourite(){
  var users= firebase.auth().currentUser;
  var userid=users.uid
  
  return new Promise((resolve, reject)=>{
    firebase.database().ref("likedPictures/"+userid).on('value', (data: any) => {

      var message = data.val();
       console.log(data.val());
       if(message !=null){

        var keys: any = Object.keys(message);
 
        console.log(keys);
  
        for (var i = 0; i < keys.length; i++){
         var k = keys[i];
  
         let obj = {
           k:keys ,
           message:message[k].message
  
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

 General(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'General' ).on('value', (data: any) => {
 
      var message = data.val();
       console.log(data.val());
 
       var keys: any = Object.keys(message);
 
       console.log(keys);
 
       for (var i = 0; i < keys.length; i++){
        var k = keys[i];
 
        let obj = {
          k:keys ,
          message:message[k].message
 
        }
        this.newJobArray.push(obj)
 
        resolve(this.newJobArray);
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
 thinkingofyou(){
  return new Promise((resolve, reject)=>{
    firebase.database().ref('category/'+ 'thinking of you' ).on('value', (data: any) => {
 
      var message = data.val();
       console.log(data.val());
 
       var keys: any = Object.keys(message);
 
       console.log(keys);
 
       for (var i = 0; i < keys.length; i++){
        var k = keys[i];
 
        let obj = {
          k:keys ,
          message:message[k].message
 
        }
        this.newJobArray.push(obj)
        alert
 
        resolve(this.newJobArray);
  }
   Error =>{
    // reject(Error)
    console.log("clicked")
    alert(Error)
   }
 
 })
 

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
 
}