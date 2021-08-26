import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {
  heroesUrl = "api/heroes";
  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ =>this.log('fetched Heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[])

      ));
  }
  handleError<T>(operation = "Operation",result?: T ){
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_=> this.log(`Hero fetched for ${id}`),
    catchError(this.handleError<Hero>('getHero'))));
  }
  log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
}
