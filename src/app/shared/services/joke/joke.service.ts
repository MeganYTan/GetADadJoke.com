import { Injectable } from '@angular/core';
import { Joke } from '../../../models/joke.model';
/**
 * JokeService manages the selected joke between components
 * 
 * * Usage:
 * - When a user clicks on a joke in the `JokeListComponent`, the service stores the joke.
 * - The `JokePageComponent` can then retrieve the joke through this service.
 */
@Injectable({
  providedIn: 'root'
})
export class JokeService {
  currentJoke: Joke | null = null;

  setCurrentJoke(joke: Joke): void {
    this.currentJoke = joke;
  }
  getCurrentJoke(): Joke | null {
    return this.currentJoke;
  }
}
