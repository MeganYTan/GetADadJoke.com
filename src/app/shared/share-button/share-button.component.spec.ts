import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareButtonComponent } from './share-button.component';
import { ActivatedRoute } from '@angular/router';

describe('ShareButtonComponent', () => {
  let component: ShareButtonComponent;
  let fixture: ComponentFixture<ShareButtonComponent>;
  let mockClipboard: jasmine.Spy;
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (param: string) => null
      }
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareButtonComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
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

  it('should share current URL if jokeId is in url', () => {
    const jokeId = '123';
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot.paramMap.get = (param: string) => jokeId;
    component.shareJoke();
    expect(mockClipboard).toHaveBeenCalledWith(`${window.location.href}`);
  });

  it('should share joke with URL if jokeId is not in url', () => {
    component.jokeId = '123';
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot.paramMap.get = (param: string) => null;
    component.shareJoke();
    const expectedUrl = `${window.location.origin}/joke/${component.jokeId}`;
    expect(mockClipboard).toHaveBeenCalledWith(expectedUrl);
  })
});
