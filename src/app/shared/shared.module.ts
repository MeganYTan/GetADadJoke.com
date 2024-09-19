import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomJokeButtonContentComponent } from './random-joke-button/random-joke-button-content/random-joke-button-content.component';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { CopyButtonComponent } from './copy-button/copy-button.component';
import { ShareButtonComponent } from './share-button/share-button.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { JokeListComponent } from './joke-list/joke-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RandomJokeButtonContentComponent,
    FavoriteButtonComponent,
    CopyButtonComponent,
    ShareButtonComponent,
    JokeListComponent,
    ShareButtonComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  exports: [
    RandomJokeButtonContentComponent,
    FavoriteButtonComponent,
    CopyButtonComponent,
    ShareButtonComponent,
    JokeListComponent,
    ShareButtonComponent
  ]
})
export class SharedModule { }
