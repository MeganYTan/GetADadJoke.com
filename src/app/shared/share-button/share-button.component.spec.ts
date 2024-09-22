import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareButtonComponent } from './share-button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ShareButtonComponent', () => {
  let component: ShareButtonComponent;
  let fixture: ComponentFixture<ShareButtonComponent>;
  let mockClipboard: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareButtonComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShareButtonComponent);
    component = fixture.componentInstance;
    mockClipboard = spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should copy url with jokeId to clipboardwhen button is clicked on', () => {
    component.jokeId = '123';
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    const expectedUrl = `${window.location.origin}/joke/${component.jokeId}`;
    expect(mockClipboard).toHaveBeenCalledWith(expectedUrl);
  });
});
