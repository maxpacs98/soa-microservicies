import { Component, OnInit } from '@angular/core';

import { Movie } from '../core/models/movie';
import { MovieService } from '../core/services/movie.service';
import { combineLatest, take } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../../../shell/src/app/core/models/user';
import { Comment } from '../core/models/comment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  user: User | undefined;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      combineLatest([
        this.movieService.getMovies(),
        this.movieService.getCommentsByUser(this.user?.id || 0)])
        .pipe(take(1))
        .subscribe(res => {
          const movies: Movie[] = res[0].movies;
          // @ts-ignore
          const commentsByUser: Comment[] = res[1].comments;
          const involvedMovies: Movie[] = [];
          const otherMovies: Movie[] = [];
          movies.forEach(movie => {
            commentsByUser.map(comment => comment.movie_id).includes(movie.id) ?
              involvedMovies.push(movie) : otherMovies.push(movie);
          });
          this.movies = [...involvedMovies, ...otherMovies];
      })
    } else {
      this.router.navigate(['/']);
    }
  }

  getUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://'+ url +'/');
  }

  comment(movie: Movie): void {
      this.router.navigate([`/movie/${movie.id}`]);
  }
}
