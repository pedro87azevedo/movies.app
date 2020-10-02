import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ActorsComponent } from "./actors.component"
import { ActorDetailComponent } from "./actor-detail/actor-detail.component"

const routes: Routes = [
{
  path: '',
  component: ActorsComponent
},
{
  path: 'detail/:actorName',
  component: ActorDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule { }
