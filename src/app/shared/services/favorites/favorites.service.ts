import { Injectable } from '@angular/core';
import { Joke } from '../../../models/joke.model';

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
    return Object.entries(this.favoritesMap).map(([key, value]) => ({id: key, joke: value}))
  }

  isFavorite(id: string): boolean {
    return this.favoritesMap.hasOwnProperty(id);
  }

  addFavorite(id: string, jokeText: string): void {
    this.favoritesMap[id] = jokeText;
    this.saveToLocalStorage();
  }

  removeFavorite(id: string): void {
    delete this.favoritesMap[id];
    this.saveToLocalStorage();
  }
}
