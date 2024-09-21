import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { CopyButtonComponent } from './copy-button/copy-button.component';
import { ShareButtonComponent } from './share-button/share-button.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HideElementDirective } from './directives/app-hide-element.directive';
import { JokeListComponent } from './joke-list/joke-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FavoriteButtonComponent,
    CopyButtonComponent,
    ShareButtonComponent,
    ShareButtonComponent,
    HideElementDirective,
    JokeListComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    FavoriteButtonComponent,
    CopyButtonComponent,
    ShareButtonComponent,
    ShareButtonComponent,
    JokeListComponent
  ]
})
export class SharedModule { }
