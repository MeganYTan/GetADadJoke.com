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
    if (!urlJokeId) {
      // get permanent url
      navigator.clipboard.writeText(`${window.location.href}/${this.jokeId}`);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }
}
