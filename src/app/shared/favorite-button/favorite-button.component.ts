import { Component, Input, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites/favorites.service';
import { Joke } from '../../models/joke.model';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent implements OnInit{
  @Input() joke!: Joke;
  isFavorite: boolean = false;
  constructor(
    private favoritesService: FavoritesService
  ){}
  ngOnInit(): void {
      this.isFavorite = this.favoritesService.isFavorite(this.joke.id);
  }

  addToFavorite(): void {
    this.isFavorite ? this.favoritesService.removeFavorite(this.joke.id) : this.favoritesService.addFavorite(this.joke.id, this.joke.joke);
    this.isFavorite = ! this.isFavorite;
  }
}
