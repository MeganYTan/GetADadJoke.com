import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
})
export class CopyButtonComponent {
  @Input() jokeText: string = '';
  copyJoke() {
    if (this.jokeText) {
      navigator.clipboard.writeText(this.jokeText);
    }
  }
}
