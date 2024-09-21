import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { CopyButtonComponent } from './copy-button/copy-button.component';
import { ShareButtonComponent } from './share-button/share-button.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HideElementDirective } from './directives/app-hide-element.directive';



@NgModule({
  declarations: [
    FavoriteButtonComponent,
    CopyButtonComponent,
    ShareButtonComponent,
    ShareButtonComponent,
    HideElementDirective
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  exports: [
    FavoriteButtonComponent,
    CopyButtonComponent,
    ShareButtonComponent,
    ShareButtonComponent
  ]
})
export class SharedModule { }
