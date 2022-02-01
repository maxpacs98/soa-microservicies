import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Comment} from '../models/comment';

import { Movie } from '../models/movie';

const URL = 'http://0.0.0.0:80';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies: Movie[] = [
    {
      id: 1,
      name: 'Avatar',
      director: 'Gica Agi',
      duration: 150,
      trailerLink: 'www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1',
      description: 'Benedetto Pistrucci (1783–1855) was an Italian gem-engraver, medallist and coin engraver, probably best known for his design of Saint George and the Dragon for the British sovereign coin. Born in Rome, he became prominent as a cameo carver. In 1815, he moved to Britain, where he would live for most of the rest of his life. His talent brought him to the attention of William Wellesley-Pole, Master of the Mint. Pole engaged'
    },
  ];

  constructor(private http: HttpClient) { }

  getMovies(): Observable<{ movies: Movie[] }> {
    return this.http.get<{ movies: Movie[] }>(`${URL}/api/movies`);
  }

  getMovieById(movieId: number): Observable<{ movie: Movie }> {
    return this.http.get<{ movie: Movie }>(`${URL}/api/movies/${movieId}`);
  }

  getCommentsByUser(userId: number): Observable<{ comments: Comment[] }> {
    return this.http.get<{ comments: Comment[] }>(`${URL}/api/comments/customer/${userId}`);
  }

  getMovieComments(movieId: number): Observable<{ comments: Comment[] }> {
    return this.http.get<{ comments: Comment[] }>(`${URL}/api/comments/movie/${movieId}`);
  }

  comment(comment: Comment): Observable<any> {
    return this.http.post<any>(`${URL}/api/comment`, comment);
  }
}
