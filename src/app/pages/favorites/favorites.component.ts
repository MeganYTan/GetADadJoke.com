import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../shared/services/favorites/favorites.service';
import { Joke } from '../../models/joke.model';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [SharedModule, NgxPaginationModule, CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  jokeList: Joke[] = [];
  itemsPerPage: number = 15;
  page: number = 1;
  totalItems: number = 1;
  constructor(
    private favoritesService: FavoritesService
  ) {}
  ngOnInit(): void {
      this.jokeList = this.favoritesService.getFavoritesList();
      this.totalItems = this.jokeList.length;
      console.log(this.jokeList)
  }
  onPageChange($event: any) {
    this.page = $event;
  }
}
