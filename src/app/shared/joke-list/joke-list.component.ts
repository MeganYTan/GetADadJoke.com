import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJokeListInputConfiguration } from './joke-list-input-config.model';

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
    totalItems: 1,
    jokeList: []
  };
  @Output() pageChangedEvent: EventEmitter<number> = new EventEmitter<number>();
  itemsPerPage: number = 15;

  /**
   * Emits an event to the parent when user changes a page
   * @param $event the page number
   */
  onPageChange($event: number): void {
    this.paginationConfiguration.page = $event;
    this.pageChangedEvent.emit($event);
  }
}
