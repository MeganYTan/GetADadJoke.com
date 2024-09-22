import { Injectable } from '@angular/core';
import { Joke } from '../../../models/joke.model';

/**
 * FavoritesService keeps track of and manage jokes that are favorited. 
 * It uses localStorage with the 'joke-favorites' key to store a list of favorited jokes
 */
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesKey = 'joke-favorites'; 
  private favoritesMap: { [id: string]: string } = {};
  constructor() { 
    const storedFavorites = localStorage.getItem(this.favoritesKey);
    this.favoritesMap = storedFavorites ? JSON.parse(storedFavorites) : {};
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favoritesMap));
  }

  getFavoritesList(): Joke[] {
    return Object.entries(this.favoritesMap).map(([key, value]) => ({id: key, joke: value}));
  }

  isFavorite(id: string): boolean {
    return this.favoritesMap.hasOwnProperty(id);
  }

  private addFavorite(id: string, jokeText: string): void {
    this.favoritesMap[id] = jokeText;
    this.saveToLocalStorage();
  }

  private removeFavorite(id: string): void {
    delete this.favoritesMap[id];
    this.saveToLocalStorage();
  }

  toggleFavorite(joke: Joke): void {
    this.isFavorite(joke.id) ? this.removeFavorite(joke.id) : this.addFavorite(joke.id, joke.joke);
  }
}
