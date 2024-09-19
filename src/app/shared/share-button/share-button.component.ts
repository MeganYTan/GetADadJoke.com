import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
})
export class ShareButtonComponent {
  @Input() jokeId: string = '';
  constructor(
    private route: ActivatedRoute
  ) {}
  shareJoke() {
    const isGitHubPages = window.location.pathname.includes('/GetADadJoke.com');
    const baseUrl = isGitHubPages ? `${window.location.origin}/GetADadJoke.com` : `${window.location.origin}`;
    navigator.clipboard.writeText(`${baseUrl}/joke/${this.jokeId}`);
  }
}
