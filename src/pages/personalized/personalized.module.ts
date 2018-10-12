import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalizedPage } from './personalized';

@NgModule({
  declarations: [
    PersonalizedPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalizedPage),
  ],
})
export class PersonalizedPageModule {}
