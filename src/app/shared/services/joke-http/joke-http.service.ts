import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * JokeHttpService makes the HTTP requests to the icanhazdadjoke API
 */
@Injectable({
  providedIn: 'root'
})
export class JokeHttpService {

  private apiUrl = 'https://icanhazdadjoke.com/';
  private headers = new HttpHeaders({
    'Accept': 'application/json'
  });
  constructor(
    private http: HttpClient
  ) { 
    
  }
  getARandomJoke(): Observable<any> {
   return this.http.get(this.apiUrl, {headers: this.headers});
  }

  getJokeById(jokeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/j/${jokeId}`, {headers: this.headers});
  }

  searchJokes(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?term=${query}&limit=15&page=${page}`, {headers: this.headers});
  }
}
