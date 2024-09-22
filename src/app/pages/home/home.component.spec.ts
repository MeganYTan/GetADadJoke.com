import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';
import { ActivatedRoute } from '@angular/router';
import { JokeListComponent } from '../../shared/joke-list/joke-list.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const mockJokes = [
    { id: '1', joke: 'Joke 1', status: 200 },
    { id: '2', joke: 'Joke 2', status: 200 },
    { id: '3', joke: 'Joke 3', status: 200 },
    { id: '4', joke: 'Joke 4', status: 200 },
    { id: '5', joke: 'Joke 5', status: 200 }
  ];
  const jokeHttpServiceMock = {
    searchJokes: jasmine.createSpy('searchJokes').and.returnValue(of({
      current_page: 1,
      total_jokes: mockJokes.length,
      results: mockJokes
    }))
  };
  const searchTerm = 'Sample';
  const activatedRouteMock = {
    queryParams: of({ term: searchTerm })
  }
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: JokeHttpService, useValue: jokeHttpServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock}, 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get term from url and search joke', () => {
    expect(component.term).toEqual(searchTerm);
    expect(jokeHttpServiceMock.searchJokes).toHaveBeenCalledWith(searchTerm, 1);
  });

  it('should searchJokes with term from url with correct page when page is changed', () => {
    const childElement = fixture.debugElement.query(By.directive(JokeListComponent)).componentInstance;
    childElement.pageChangedEvent.emit(5);
    expect(jokeHttpServiceMock.searchJokes).toHaveBeenCalledWith(searchTerm, 5);
  })
});
