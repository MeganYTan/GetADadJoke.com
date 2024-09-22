import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../shared/services/favorites/favorites.service';
import { SharedModule } from '../../shared/shared.module';
import { IJokeListInputConfiguration } from '../../shared/joke-list/joke-list-input-config.model';

/**
 * FavoritesComponent is the component for the Favorites page
 */
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit{
  paginationConfiguration: IJokeListInputConfiguration = {
    jokeList: [],
    page: 1,
    totalItems : 1
  }
  constructor(
    private favoritesService: FavoritesService
  ) {}
  ngOnInit(): void {
      this.getFavoriteJokes();
      
  }
  refreshFavorites(): void {
    this.getFavoriteJokes();
  }
  getFavoriteJokes(): void {
    this.paginationConfiguration.jokeList = this.favoritesService.getFavoritesList();
    this.paginationConfiguration.totalItems = this.paginationConfiguration.jokeList.length;
  }
}
