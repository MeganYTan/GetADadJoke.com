import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteButtonComponent } from './favorite-button.component';
import { By } from '@angular/platform-browser';
import { Joke } from '../../models/joke.model';
import { FavoritesService } from '../services/favorites/favorites.service';

describe('FavoriteButtonComponent', () => {
  let component: FavoriteButtonComponent;
  let fixture: ComponentFixture<FavoriteButtonComponent>;
  let mockFavoriteService: any;
  const mockJoke: Joke = {
    id: '1',
    joke: 'Sample joke',
    status: 200
  }
  beforeEach(async () => {
    mockFavoriteService = {
      isFavorite: jasmine.createSpy('isFavorite').and.returnValue(false),
      addFavorite: jasmine.createSpy('addFavorite'),
      removeFavorite: jasmine.createSpy('removeFavorite')
    }
    await TestBed.configureTestingModule({
      declarations: [FavoriteButtonComponent],
      providers: [
        {provide: FavoritesService, useValue: mockFavoriteService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteButtonComponent);
    component = fixture.componentInstance;
    component.joke = mockJoke;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display filled heart icon when joke is a favorite', () => {
    component.isFavorite = true;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('i')).nativeElement;
    expect(icon.classList).toContain('bi-heart-fill');
  });
  it('should display empty heart icon when joke is not a favorite', () => {
    component.isFavorite = false;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('i')).nativeElement;
    expect(icon.classList).toContain('bi-heart');
  });
  it('should add to favorite if button is clicked and joke is not a favorite', () => {
    component.isFavorite = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(mockFavoriteService.addFavorite).toHaveBeenCalledWith(mockJoke.id, mockJoke.joke);
    expect(component.isFavorite).toBeTrue();
  });
  it('should remove from favorite if buttin is clicked and joke is a favorite', () => {
    component.isFavorite = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(mockFavoriteService.removeFavorite).toHaveBeenCalledWith(mockJoke.id);
    expect(component.isFavorite).toBeFalse();
  });
});
