import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiconnectedPage } from './diconnected';

@NgModule({
  declarations: [
    DiconnectedPage,
  ],
  imports: [
    IonicPageModule.forChild(DiconnectedPage),
  ],
})
export class DiconnectedPageModule {}
