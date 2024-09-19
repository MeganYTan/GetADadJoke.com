import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
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
