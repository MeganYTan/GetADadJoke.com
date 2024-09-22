import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let mockGetItem: jasmine.Spy;
  let mockSetItem: jasmine.Spy;
  const mockJoke1 = {id: '1', joke: 'Joke 1'};
  const mockJoke2 = {id: '2', joke: 'Joke 2'};
  const favoritesMap = {'1': mockJoke1.joke};
  beforeEach(() => {
    mockGetItem = spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return JSON.stringify(favoritesMap);
    });

    mockSetItem = spyOn(localStorage, 'setItem').and.callFake(() => {});
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize values from localStorage', () => {
    expect(mockGetItem).toHaveBeenCalledWith('joke-favorites');
    expect(service.getFavoritesList()).toEqual([mockJoke1]);
  });

  it('should add joke to favorites and store it in localStorage if toggleFavorite is called and joke is not a favorite', () => {
    service.toggleFavorite(mockJoke2);
    expect(mockSetItem).toHaveBeenCalledWith('joke-favorites', JSON.stringify({'1': mockJoke1.joke, '2': mockJoke2.joke}));
  });

  it('should remove joke from favorites and update localStorage', () => {
    service.toggleFavorite(mockJoke1);
    expect(mockSetItem).toHaveBeenCalledWith('joke-favorites', '{}');
  });

  it('should return true if joke is a favorite', () => {
    expect(service.isFavorite(mockJoke1.id)).toBeTrue();
  });
  
  it('should return false if joke is not a favorite', () => {
    expect(service.isFavorite(mockJoke2.id)).toBeFalse();
  });
});
