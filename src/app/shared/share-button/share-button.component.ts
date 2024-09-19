import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.css'
})
export class ShareButtonComponent {
  @Input() jokeId: string = '';
  constructor(
    private route: ActivatedRoute
  ) {}
  shareJoke() {
    const urlJokeId = this.route.snapshot.paramMap.get('jokeId');
    if (urlJokeId) {
      // just share the url
      navigator.clipboard.writeText(window.location.href);
    } else {
      // get permanent url
      navigator.clipboard.writeText(`${window.location.origin}/joke/${this.jokeId}`);
    }
  }
}
