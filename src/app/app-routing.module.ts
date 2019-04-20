import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ScoreboardComponent
  },
  {
    path: 'details/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
