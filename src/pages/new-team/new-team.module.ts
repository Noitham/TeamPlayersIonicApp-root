import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTeamPage } from './new-team';

@NgModule({
  declarations: [
    NewTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTeamPage),
  ],
})
export class NewTeamPageModule {}
