import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { CoreModule } from '../core/core.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MovieComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
