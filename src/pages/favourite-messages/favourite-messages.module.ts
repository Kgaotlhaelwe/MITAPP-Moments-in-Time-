import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouriteMessagesPage } from './favourite-messages';

@NgModule({
  declarations: [
    FavouriteMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavouriteMessagesPage),
  ],
})
export class FavouriteMessagesPageModule {}
