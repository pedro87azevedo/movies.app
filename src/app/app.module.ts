import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from "@angular/common/http"

import { ToastrModule } from "ngx-toastr"

import { NavigationModule } from "./modules/navigation/navigation.module"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from './app.component';
import { MovieDetailComponent } from './modules/movies/movie-detail/movie-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NavigationModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
