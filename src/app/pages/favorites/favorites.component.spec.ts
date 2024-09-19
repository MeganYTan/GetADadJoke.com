import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '../../shared/services/favorites/favorites.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  const mockJokes = [
    { id: '1', joke: 'Joke 1', status: 200 },
    { id: '2', joke: 'Joke 2', status: 200 },
    { id: '3', joke: 'Joke 3', status: 200 },
    { id: '4', joke: 'Joke 4', status: 200 },
    { id: '5', joke: 'Joke 5', status: 200 },
    { id: '6', joke: 'Joke 6', status: 200 },
    { id: '7', joke: 'Joke 7', status: 200 },
    { id: '8', joke: 'Joke 8', status: 200 },
    { id: '9', joke: 'Joke 9', status: 200 },
    { id: '10', joke: 'Joke 10', status: 200 },
    { id: '11', joke: 'Joke 11', status: 200 },
    { id: '12', joke: 'Joke 12', status: 200 },
    { id: '13', joke: 'Joke 13', status: 200 },
    { id: '14', joke: 'Joke 14', status: 200 },
    { id: '15', joke: 'Joke 15', status: 200 },
    { id: '16', joke: 'Joke 16', status: 200 },
  ];
  beforeEach(async () => {
    const favoriteServiceMock = {
      getFavoritesList: jasmine.createSpy('getFavoritesList').and.returnValue(mockJokes),
      isFavorite: jasmine.createSpy('isFavorite').and.returnValue(true)
    };
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, FormsModule, NgxPaginationModule],
      providers: [
        {provide: FavoritesService, useValue: favoriteServiceMock},
        { provide: ActivatedRoute, useValue: { queryParams: of({ term: 'Sample' }) }}, 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display corrent number of jokes', () => {
    fixture.detectChanges();
    const jokeElements = fixture.debugElement.queryAll(By.css('.joke-list-item'));
    expect(jokeElements.length).toBe(15);
  });



});
