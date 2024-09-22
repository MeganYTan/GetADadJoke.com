import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
})
export class ShareButtonComponent {
  @Input() jokeId: string = '';
  @Input() shouldHideText: boolean = false;
  shareJoke() {
    const isGitHubPages = window.location.pathname.includes('/GetADadJoke.com');
    const baseUrl = isGitHubPages ? `${window.location.origin}/GetADadJoke.com` : `${window.location.origin}`;
    navigator.clipboard.writeText(`${baseUrl}/joke/${this.jokeId}`);
  }
}
