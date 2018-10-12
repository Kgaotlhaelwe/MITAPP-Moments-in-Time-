import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutomatePage } from './automate';

@NgModule({
  declarations: [
    AutomatePage,
  ],
  imports: [
    IonicPageModule.forChild(AutomatePage),
  ],
})
export class AutomatePageModule {}
