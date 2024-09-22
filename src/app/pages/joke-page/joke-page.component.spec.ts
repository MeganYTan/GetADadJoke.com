import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokePageComponent } from './joke-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';

describe('JokePageComponent', () => {
  let component: JokePageComponent;
  let fixture: ComponentFixture<JokePageComponent>;
  const mockJokes = [
    { id: '1', joke: 'Joke 1', status: 200 },
    { id: '2', joke: 'Joke 2', status: 200 },
  ];
  const jokeHttpServiceMock = {
    getARandomJoke: jasmine.createSpy('getARandomJoke').and.returnValue(of(mockJokes[0])),
    getJokeById: jasmine.createSpy('getJokeById').and.returnValue(of(mockJokes[1]))
  };
  const mockActivatedRouteSnapshotWithId = {
    snapshot: {
      paramMap: {
        get: (key: string) => key === 'id' ? '1' : null
      }
    }
  };
  const mockActivatedRouteSnapshotWithoutId = {
    snapshot: {
      paramMap: {
        get: (key: string) => null
      }
    }
  };
  afterEach(() => {
    jokeHttpServiceMock.getARandomJoke.calls.reset();
    jokeHttpServiceMock.getJokeById.calls.reset();
  });
  describe('When Joke ID is in url', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [JokePageComponent],
        providers: [
          { provide: JokeHttpService, useValue: jokeHttpServiceMock },
          { provide: ActivatedRoute, useValue: mockActivatedRouteSnapshotWithId },
        ],
      })
        .compileComponents();

      fixture = TestBed.createComponent(JokePageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should getJokeById when joke id is present in URL', () => {
      expect(jokeHttpServiceMock.getJokeById).toHaveBeenCalledWith('1');
      expect(jokeHttpServiceMock.getARandomJoke).not.toHaveBeenCalled();
      expect(component.joke).toEqual(mockJokes[1]);
    });
  });
  describe('When Joke ID is not in url', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [JokePageComponent],
        providers: [
          { provide: JokeHttpService, useValue: jokeHttpServiceMock },
          { provide: ActivatedRoute, useValue: mockActivatedRouteSnapshotWithoutId },
        ],
      })
        .compileComponents();

      fixture = TestBed.createComponent(JokePageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should getARandomJoke when joke is is not present in URL', () => {
      console.log('should getARandomJoke joke id: ', component.jokeId);
      expect(jokeHttpServiceMock.getJokeById).not.toHaveBeenCalled();
      expect(jokeHttpServiceMock.getARandomJoke).toHaveBeenCalled();
    });
  })
});
