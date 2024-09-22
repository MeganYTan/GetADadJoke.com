import { TestBed } from '@angular/core/testing';

import { JokeService } from './joke.service';

describe('JokeServiceService', () => {
  let service: JokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get and set currentJoke', () => {
    const joke = {
      id: "1",
      joke: "Sample Joke"
    };
    service.setCurrentJoke(joke);
    expect(service.getCurrentJoke()).toEqual(joke);
  });
});
