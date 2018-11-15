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
import { SplashPage } from '../pages/splash/splash';
import { timer } from 'rxjs/observable/timer'
import { MessagePage } from '../pages/message/message';
import { ImageLoaderConfig } from 'ionic-image-loader';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage :any = AdminPage 

  showSplash=true;
  selectedTheme

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  db:DatabaseProvider,  private imageLoaderConfig: ImageLoaderConfig) {
    // db.getActiveTheme().subscribe(val => this.selectedTheme = val)
   db.getActiveTheme().subscribe((val)=>{
    this.selectedTheme = val
    console.log(this.selectedTheme);
    
   })
    // db.checkstate().then((data:any)=>{

    //   if (data ==1){
    //     this.rootPage = TabsPage;
     
    //   }
    //   else {
    //     this.rootPage = LoginPage;
    //   }
    //  })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.imageLoaderConfig.enableDebugMode();
      this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
      this.imageLoaderConfig.setFallbackUrl('assets/imgs/logo.png');
      this.imageLoaderConfig.setMaximumCacheAge(24 * 60 * 60 * 1000);
 
      statusBar.styleDefault();
      splashScreen.hide();
       timer(3000).subscribe(()=> this.showSplash = false )
    });
  }
}
