import { Component } from '@angular/core';

/**
 * PageNotFoundComponent displays a message when a user navigates to a non-existent route.
 */
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  template: '<div class = "text-center">Uh oh... Nothing here</div>',
})
export class PageNotFoundComponent {

}
