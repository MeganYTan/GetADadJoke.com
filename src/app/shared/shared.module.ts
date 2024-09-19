import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomJokeButtonContentComponent } from './random-joke-button/random-joke-button-content/random-joke-button-content.component';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { CopyButtonComponent } from './copy-button/copy-button.component';
import { ShareButtonComponent } from './share-button/share-button.component';



@NgModule({
  declarations: [
    RandomJokeButtonContentComponent,
    FavoriteButtonComponent,
    CopyButtonComponent,
    ShareButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RandomJokeButtonContentComponent,
    FavoriteButtonComponent,
    CopyButtonComponent,
    ShareButtonComponent
  ]
})
export class SharedModule { }
