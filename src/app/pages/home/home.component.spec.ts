import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let jokeHttpService: JokeHttpService;
  const mockJokes = [
    { id: '1', joke: 'Joke 1', status: 200 },
    { id: '2', joke: 'Joke 2', status: 200 },
    { id: '3', joke: 'Joke 3', status: 200 },
    { id: '4', joke: 'Joke 4', status: 200 },
    { id: '5', joke: 'Joke 5', status: 200 }
  ];
  beforeEach(async () => {
    const jokeHttpServiceMock = {
      searchJokes: jasmine.createSpy('searchJokes').and.returnValue(of({
        current_page: 1,
        total_jokes: 5,
        results: mockJokes
      }))
    };
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: JokeHttpService, useValue: jokeHttpServiceMock },
        { provide: ActivatedRoute, useValue: { queryParams: of({ term: 'Sample' }) }}, 
        provideRouter([]) 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /joke/{{joke.id}} when joke is clicked', () => {
    spyOn(router, 'navigate');
    fixture.detectChanges();
    const jokeLink = fixture.debugElement.query(By.css('a')).nativeElement;
    jokeLink.click();
    fixture.detectChanges()
    const jokeId = mockJokes[0].id;
    expect(router.navigate).toHaveBeenCalledWith([`/joke/${jokeId}`]);
  });
});
