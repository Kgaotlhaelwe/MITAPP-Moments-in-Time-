import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { TabsPage } from '../pages/tabs/tabs';
import {RegisterPage} from '../pages/register/register';
import {LoginPage} from '../pages/login/login';
import {AdminPage} from '../pages/admin/admin'
import {HomePage} from '../pages/home/home'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { EventPage } from '../pages/event/event';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any                  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  db:DatabaseProvider) {

   db.checkstate().then((data:any)=>{

      if (data ==1){
        this.rootPage = TabsPage;
     
      }
      else {
        this.rootPage = LoginPage
      }
     })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
