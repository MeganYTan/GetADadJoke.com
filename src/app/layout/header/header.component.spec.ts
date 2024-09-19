import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [FormsModule],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchJokes() when the search button is clicked', () => {
    spyOn(component, 'searchJokes');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.searchJokes).toHaveBeenCalled();
  });

  it('should navigate to /search with query params when searchJokes() is called', () => {
    spyOn(router, 'navigate');
    component.term = 'funny';
    component.searchJokes();
    expect(router.navigate).toHaveBeenCalledWith(['/search'], {
      queryParams: { term: 'funny' },
    });
  });

  it('should trigger searchJokes() when Enter key is pressed', () => {
    spyOn(component, 'searchJokes');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    input.dispatchEvent(event);
    expect(component.searchJokes).toHaveBeenCalled();
  });
});
