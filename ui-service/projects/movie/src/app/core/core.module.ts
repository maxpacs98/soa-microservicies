import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './pipes/duration.pipe';
import { MovieService } from './services/movie.service';



@NgModule({
  declarations: [
    DurationPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DurationPipe
  ],
  providers: [
    MovieService
  ]
})
export class CoreModule { }
