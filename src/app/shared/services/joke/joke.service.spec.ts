import { TestBed } from '@angular/core/testing';

import { JokeService } from './joke.service';
import { Joke } from '../../../models/joke.model';

describe('JokeService', () => {
  let service: JokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get currentJokeId', () => {
    const jokeId = "123";
    service.setCurrentJokeId(jokeId);
    expect(service.getCurrentJokeId()).toEqual(jokeId);
  });
  it('should set and get currentJoke', () => {
    const joke: Joke = {
      id: "123",
      joke: "Sample Joke",
      status: 200
    };
    service.setCurrentJoke(joke);
    expect(service.getCurrentJoke()).toEqual(joke);
  });
  it('should initialize currentJoke and currentJokeId to null', () => {
    expect(service.getCurrentJoke()).toBeNull();
    expect(service.getCurrentJokeId()).toBeNull();
  });
});
