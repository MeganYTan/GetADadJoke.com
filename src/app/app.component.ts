import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

/**
 * AppComponent is the root component of the application. It renders the header, main body, and footer.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutModule, SharedModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'getadadjoke';
}
