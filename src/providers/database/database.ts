import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { SocialSharing } from '@ionic-native/social-sharing';
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
  constructor(public http: HttpClient,private fire:AngularFireAuth ,private socialSharing:SocialSharing) {
    console.log('Hello DatabaseProvider Provider');
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
    firebase.database().ref('category/'+ 'Other' ).on('value', (data: any) => {

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
        this.messageArray.push(obj)
 
        resolve(this.messageArray);
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
    firebase.database().ref('category/'+ 'Generalz' ).on('value', (data: any) => {
 
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
 
        resolve(this.newJobArray);
  }
 
 
  })
 
 })
 
 
 }
}