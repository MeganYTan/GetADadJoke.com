import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';
import { JokeSearchResponse } from '../../models/joke-search.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Joke } from '../../models/joke.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, NgxPaginationModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  jokeSearchResponse: JokeSearchResponse | null = null;
  jokeList: Joke[] = [];
  page: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 1;
  term: string = '';
  constructor(
    private jokeHttpService: JokeHttpService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.term = queryParams['term'] || '';
      this.page = 1;
      this.searchJokes();
    });
    
  }
  onPageChange($event: any): void {
    this.page = $event;
    this.searchJokes();
  }

  searchJokes(): void {
    this.jokeHttpService.searchJokes(this.term, this.page).subscribe((data) => {
      this.jokeSearchResponse = data;
      this.page = this.jokeSearchResponse?.current_page || 1;
      this.totalItems = this.jokeSearchResponse?.total_jokes || 1;
      this.jokeList = this.jokeSearchResponse?.results || [];
    });
  }
}
