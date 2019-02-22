import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import {LoginPage} from '../pages/login/login' ;
import {RegisterPage} from '../pages/register/register';
import { HttpClientModule } from '@angular/common/http';
import { PersonalizedPage } from '../pages/personalized/personalized';
import { AutomatePage } from '../pages/automate/automate';
import {AdminPage} from '../pages/admin/admin'
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { MessagePage } from '../pages/message/message';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { EventPage } from '../pages/event/event';
import { PopoverPage } from '../pages/popover/popover';
import { FavouriteMessagesPage } from '../pages/favourite-messages/favourite-messages';
import { SwingModule } from 'angular2-swing';

import { SwipeCardsModule } from 'ng2-swipe-cards';
import { ViewPage } from '../pages/view/view';
import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/info/info';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {  CanvasDrawComponent } from '../components/canvas-draw/canvas-draw';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import {PersonalisedcardPage} from '../pages/personalisedcard/personalisedcard'
import { InfosentPage } from '../pages/infosent/infosent';
import { SplashPage } from '../pages/splash/splash'
import { BackgroundMode } from '@ionic-native/background-mode';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SignaturePadModule } from 'angular2-signaturepad';
import { IonicStorageModule } from '@ionic/storage';
import { Calendar } from '@ionic-native/calendar';
import { ModalmessagePage } from '../pages/modalmessage/modalmessage';
import { IonicImageLoader } from 'ionic-image-loader';
// import { ExpandableHeader } from '../components/expandable-header/expandable-header';
import {  } from '../components/expandable-header/expandable-header'
import { Network } from '@ionic-native/network';
import { DiconnectedPage } from '../pages/diconnected/diconnected';
import {AddContactsPage} from '../pages/add-contacts/add-contacts' ;
import { FormsModule } from '@angular/forms';

import { from } from 'rxjs/observable/from';

var config = {
  apiKey: "AIzaSyD-60vJrUA-k0qFjOyc-2quuULN2t9DKAc",
  authDomain: "momentsintime-a9b60.firebaseapp.com",
  databaseURL: "https://momentsintime-a9b60.firebaseio.com",
  projectId: "momentsintime-a9b60",
  storageBucket: "",
  messagingSenderId: "475473470654"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage, 
    AdminPage ,
    TabsPage , 
    LoginPage , 
    RegisterPage,
    PersonalizedPage,
    AutomatePage,
    MessagePage,
    EventPage,
    PopoverPage,
    SplashPage,
    FavouriteMessagesPage,
    ViewPage,
    ProfilePage,
    InfoPage ,
     CanvasDrawComponent,
      PersonalisedcardPage,
      InfosentPage,
      ModalmessagePage , 
      DiconnectedPage, AddContactsPage
      // ExpandableHeader
  ],
  imports: [
    BrowserModule,HttpClientModule ,SwipeCardsModule, FormsModule ,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:false  
      

    }),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,IonicImageViewerModule,
    SignaturePadModule,
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage, 
    AdminPage , 
    TabsPage , 
    RegisterPage , 
    LoginPage,
    PersonalizedPage,
    AutomatePage,
    MessagePage,
    EventPage,
    PopoverPage,
    FavouriteMessagesPage,
    SplashPage,
    ViewPage,
    ProfilePage,
    InfoPage, 
    PersonalisedcardPage,
    InfosentPage,
    ModalmessagePage,
    DiconnectedPage , AddContactsPage,
  ],
  providers: [
    StatusBar,   SQLite ,
    SplashScreen, DatabaseProvider , SMS , SocialSharing ,Contacts,LocalNotifications,Camera ,BackgroundMode ,Calendar ,Network ,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  
  ]
})
export class AppModule {}
