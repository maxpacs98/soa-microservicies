import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../core/models/movie';
import { Comment } from '../../core/models/comment';
import { MovieService } from '../../core/services/movie.service';
import { Observable, take } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../../../../shell/src/app/core/models/user';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;
  comments: Comment[] = [];
  newCommentControl: FormControl = new FormControl(undefined);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    const movieId = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieById(movieId).pipe(take(1)).subscribe(res => this.movie = res.movie);
    this.getComments(movieId || 0);
  }

  getComments(movieId: number): void {
    this.movieService.getMovieComments(movieId).pipe(take(1)).subscribe(res => this.comments = res.comments);
  }

  comment(): void {
    if (this.newCommentControl.valid) {
      const comment = {} as Comment;
      comment.text = this.newCommentControl.value;
      comment.commented_at = new Date();
      comment.customer_id = JSON.parse(localStorage.getItem('user') as string).id;
      comment.movie_id = this.movie?.id as number;
      this.movieService.comment(comment).pipe(take(1)).subscribe(res => this.getComments(this.movie?.id || 0));
    }
  }

  getUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://'+ url +'/');
  }

  getUserName(id: number): string {
    const user = JSON.parse(localStorage.getItem('user') || '') as User;
    return user?.id !== id ? `Anonymous ${id}` : user.display_name;
  }
}
