import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'unsubscribe', component: UnsubscribeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
