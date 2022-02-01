import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieModule } from './movie/movie.module';
import { MovieRoutingModule } from './movie/movie-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MovieModule,
    MovieRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
