import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomJokeButtonComponent } from './random-joke-button.component';

describe('RandomJokeButtonComponent', () => {
  let component: RandomJokeButtonComponent;
  let fixture: ComponentFixture<RandomJokeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomJokeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomJokeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
