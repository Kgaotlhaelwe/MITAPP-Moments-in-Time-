import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddContactsPage } from './add-contacts';

@NgModule({
  declarations: [
    AddContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddContactsPage),
  ],
})
export class AddContactsPageModule {}
