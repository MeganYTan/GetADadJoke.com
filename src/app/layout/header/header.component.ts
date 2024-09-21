import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * HeaderComponent is the header of the application. The search bar is implemented by navigating to /search
 * - `term`: searchTerm to search for jokes 
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  term: string = "";
  constructor(
    private router: Router
  ){}
  searchJokes() {
    this.router.navigate(['/search'], {
      queryParams: {term: this.term}
    });
  }
}
