import { Component, Input } from '@angular/core';

/**
 * CopyButtonComponent is a button that copies the jokeText to the clipboard
 * - `jokeText`: text to be copied to the clipboard
 * - `shouldHideText`: Flag indicating if the text of the button should be hidden on smaller screen sizes
 */
@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
})
export class CopyButtonComponent {
  @Input() jokeText: string = '';
  @Input() shouldHideText: boolean = false;
  copyJoke() {
    if (this.jokeText) {
      navigator.clipboard.writeText(this.jokeText);
    }
  }
}
