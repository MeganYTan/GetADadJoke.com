import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyButtonComponent } from './copy-button.component';
import { By } from '@angular/platform-browser';

describe('CopyButtonComponent', () => {
  let component: CopyButtonComponent;
  let fixture: ComponentFixture<CopyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopyButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call copyJoke when button is clicked', () => {
    spyOn(component, 'copyJoke');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.copyJoke).toHaveBeenCalled();
  });

  it('should copy jokeText to clipboard when copyJoke is called', () => {
    const jokeText = "Sample Joke"
    component.jokeText = jokeText;
    spyOn(navigator.clipboard, 'writeText');
    component.copyJoke();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(jokeText);
  })
});
