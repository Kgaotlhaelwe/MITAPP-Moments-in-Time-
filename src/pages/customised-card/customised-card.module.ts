import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomisedCardPage } from './customised-card';

@NgModule({
  declarations: [
    CustomisedCardPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomisedCardPage),
  ],
})
export class CustomisedCardPageModule {}
