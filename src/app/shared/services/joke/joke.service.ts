import { Injectable } from '@angular/core';
import { Joke } from '../../../models/joke.model';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  private currentJokeId: string | null = null;
  private currentJoke: Joke | null = null;
  constructor() { 
  }
  getCurrentJokeId(): string | null {
    return this.currentJokeId;
  }
  setCurrentJokeId(jokeId: string | null): void {
    this.currentJokeId = jokeId;
  }
  getCurrentJoke(): Joke | null {
    return this.currentJoke;
  }
  setCurrentJoke(joke: Joke): void {
    this.currentJoke = joke;
  }

}
