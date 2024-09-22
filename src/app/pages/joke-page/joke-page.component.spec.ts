import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, NavigationSkipped } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { JokePageComponent } from './joke-page.component';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';
import { JokeService } from '../../shared/services/joke.service';

describe('JokePageComponent', () => {
  let component: JokePageComponent;
  let fixture: ComponentFixture<JokePageComponent>;
  let jokeHttpServiceMock: any;
  let jokeServiceMock: any;
  let routeMock: any;
  let routerMock: any;

  const mockJokes = [
    { id: '1', joke: 'Joke 1', status: 200 },
    { id: '2', joke: 'Joke 2', status: 200 },
  ];

  beforeEach(async () => {
    jokeHttpServiceMock = {
      getARandomJoke: jasmine.createSpy('getARandomJoke').and.returnValue(of(mockJokes[0])),
      getJokeById: jasmine.createSpy('getJokeById').and.returnValue(of(mockJokes[1])),
    };
    jokeServiceMock = {
      getCurrentJoke: jasmine.createSpy('getCurrentJoke').and.returnValue(mockJokes[0]),
    };
    routeMock = {
      paramMap: new BehaviorSubject<any>({ get: (key: string) => null }),
    };
    routerMock = {
      events: new Subject<any>(),
    };

    await TestBed.configureTestingModule({
      imports: [JokePageComponent],
      providers: [
        { provide: JokeHttpService, useValue: jokeHttpServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
        { provide: JokeService, useValue: jokeServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JokePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getJoke when router emits NavigationSkipped event', () => {
    spyOn(component, 'getJoke');
    routerMock.events.next(new NavigationSkipped(1, 'joke', ''));
    expect(component.getJoke).toHaveBeenCalled();
  });

  it('should call getJoke when "id" in paramMap changes', () => {
    spyOn(component, 'getJoke');
    routeMock.paramMap.next({ get: (key: string) => '1' });
    expect(component.getJoke).toHaveBeenCalled();
  });
  describe('when getJoke is called', () => {
    it('should call getARandomJoke when jokeId is in URL', () => {
      component.getJoke();
      expect(jokeHttpServiceMock.getJokeById).not.toHaveBeenCalled();
      expect(jokeHttpServiceMock.getARandomJoke).toHaveBeenCalled();
    });
    it('should call getJokeById when URL id does not match the id of joke in JokeService', () => {
      jokeHttpServiceMock.getARandomJoke.calls.reset();
      jokeHttpServiceMock.getJokeById.calls.reset();
      jokeServiceMock.getCurrentJoke.calls.reset();
      routeMock.paramMap.next({ get: (key: string) => 'some id' });
      component.getJoke();
      expect(jokeHttpServiceMock.getJokeById).toHaveBeenCalled();
    });

    it('should get joke from JokeService when URL id matches the id of joke in JokeService', async () => {
      jokeHttpServiceMock.getARandomJoke.calls.reset();
      jokeHttpServiceMock.getJokeById.calls.reset();
      jokeServiceMock.getCurrentJoke.calls.reset();
      routeMock.paramMap.next({ get: (key: string) => mockJokes[0].id });
      component.getJoke();
      expect(jokeServiceMock.getCurrentJoke).toHaveBeenCalled();
      expect(jokeHttpServiceMock.getJokeById).not.toHaveBeenCalled();
    });
  })

});

