import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';
import { JokeSearchResponse } from '../../models/joke-search.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { IJokeListInputConfiguration } from '../../shared/joke-list/joke-list-input-config.model';

/**
 * HomeComponent is the home page and the search results page.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, NgxPaginationModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  jokeSearchResponse: JokeSearchResponse | null = null;
  term: string = '';
  paginationConfiguration: IJokeListInputConfiguration = {
    jokeList: [],
    page: 1,
    totalItems : 0
  }
  
  constructor(
    private jokeHttpService: JokeHttpService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    // Subscribe to query parameters changes in the route to calls the API with the new search term
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.term = queryParams['term'] || '';
      // reset the page to 1 when new term is search for
      this.paginationConfiguration.page = 1;
      this.searchJokes();
    });
    
  }

  /**
   * onPageChange function is called by the EventEmitter of the child component
   * @param $event 
   */
  onPageChange($event: number): void {
    this.paginationConfiguration.page = $event;
    this.searchJokes();
  }

  searchJokes(): void {
    this.jokeHttpService.searchJokes(this.term, this.paginationConfiguration.page).subscribe((data) => {
      this.jokeSearchResponse = data;
      this.paginationConfiguration = {
        page: this.jokeSearchResponse?.current_page || 1,
        totalItems: this.jokeSearchResponse?.total_jokes || 0,
        jokeList: this.jokeSearchResponse?.results || []
      }
    });
  }
}
