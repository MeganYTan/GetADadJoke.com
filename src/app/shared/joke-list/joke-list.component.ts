import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IJokeListInputConfiguration } from './joke-list-input-config.model';
import { Joke } from '../../models/joke.model';
import { Router } from '@angular/router';
import { JokeService } from '../services/joke/joke.service';

/**
 * JokeListComponent renders a list of jokes. It receives pagination configuration from the parent to know how many pages to show and which page the user is on.
 */
@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.css'
})
export class JokeListComponent {
  @Input() paginationConfiguration: IJokeListInputConfiguration = {
    page: 1,
    totalItems: 0,
    jokeList: []
  };
  @Output() pageChangedEvent: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('jokeListWrapper') jokeListWrapper!: ElementRef;
  itemsPerPage: number = 15;

  constructor(
    private router: Router,
    private jokeService: JokeService
  ) {}
  /**
   * Emits an event to the parent when user changes a page
   * @param $event the page number
   */
  onPageChange($event: number): void {
    this.paginationConfiguration.page = $event;
    this.jokeListWrapper.nativeElement.scrollTop = 0;
    this.pageChangedEvent.emit($event);
  }

  jokeClicked(joke: Joke) {
    this.jokeService.setCurrentJoke(joke);
    this.router.navigate(['/joke', joke.id]);
  }
}
