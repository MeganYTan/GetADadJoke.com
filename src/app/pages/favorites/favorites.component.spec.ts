import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '../../shared/services/favorites/favorites.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Joke } from '../../models/joke.model';


describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  const mockJokes: Joke[] = [];
  const favoriteServiceMock = {
    getFavoritesList: jasmine.createSpy('getFavoritesList').and.returnValue(mockJokes),
    isFavorite: jasmine.createSpy('isFavorite').and.returnValue(true)
  };
  const activatedRouteMock = { queryParams: of({ term: 'Sample' }) }
  beforeEach(async () => { 
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, FormsModule, NgxPaginationModule,],
      providers: [
        {provide: FavoritesService, useValue: favoriteServiceMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get favorites list on initialization', () => {
    expect(favoriteServiceMock.getFavoritesList).toHaveBeenCalled();
  })

  it('should refresh favorites list when refresh button is clicked on', () => {
    const button = fixture.debugElement.query(By.css('#refresh-button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(favoriteServiceMock.getFavoritesList).toHaveBeenCalled();
  });

});
