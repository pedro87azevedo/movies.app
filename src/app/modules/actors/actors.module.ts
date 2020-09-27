import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms"

import { MatCardModule } from "@angular/material/card"
import { FlexLayoutModule } from "@angular/flex-layout"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule } from "@angular/material/dialog"
import { MatStepperModule } from "@angular/material/stepper"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ComponentsModule } from "./../../components/components.module";
import { NewActorComponent } from './new-movie/new-actor.component'


@NgModule({
  declarations: [
    ActorsComponent,
    ActorCardComponent,
    ActorDetailComponent,
    NewActorComponent
  ],
  imports: [
    CommonModule,
    ActorsRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ActorsModule { }