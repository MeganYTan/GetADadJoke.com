import { Component, OnInit } from '@angular/core';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../services/joke/joke.service';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.css'
})
export class JokeListComponent implements OnInit{
  jokes: Joke[] = [];
  page: number = 1;
  itemsPerPage: number = 10;
  constructor(
    private jokeService: JokeService
  ) {}
  ngOnInit(): void {
      this.jokes = this.jokeService.getJokeList();
  }

  onItemsPerPageChange(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.page = 1; 
  }
}
