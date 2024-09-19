import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokePageComponent } from './joke-page.component';
import { Router, ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';

describe('JokePageComponent', () => {
  let component: JokePageComponent;
  let fixture: ComponentFixture<JokePageComponent>;
  let router: Router;
  const mockJokes = [
    { id: '1', joke: 'Joke 1', status: 200 },
    { id: '2', joke: 'Joke 2', status: 200 },
    { id: '3', joke: 'Joke 3', status: 200 },
    { id: '4', joke: 'Joke 4', status: 200 },
    { id: '5', joke: 'Joke 5', status: 200 }
  ];
  const jokeHttpServiceMock = {
    getARandomJoke: jasmine.createSpy('getARandomJoke').and.returnValue(of(mockJokes[0])),
    getJokeById: jasmine.createSpy('getJokeById').and.returnValue(of(mockJokes[1]))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokePageComponent],
      providers: [
        { provide: JokeHttpService, useValue: jokeHttpServiceMock },
        { provide: ActivatedRoute, useValue: { queryParams: of({ term: 'Sample' }) }}, 
        provideRouter([]) 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokePageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
