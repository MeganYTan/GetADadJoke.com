import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeListComponent } from './joke-list.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { JokeService } from '../services/joke/joke.service';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('JokeListComponent', () => {
  let component: JokeListComponent;
  let fixture: ComponentFixture<JokeListComponent>;
  let jokeService: JokeService;
  const mockJokes = [
    { id: '1', joke: 'Joke 1', status: 200 },
    { id: '2', joke: 'Joke 2', status: 200 },
    { id: '3', joke: 'Joke 3', status: 200 },
    { id: '4', joke: 'Joke 4', status: 200 },
    { id: '5', joke: 'Joke 5', status: 200 },
    { id: '6', joke: 'Joke 6', status: 200 },
    { id: '7', joke: 'Joke 7', status: 200 },
    { id: '8', joke: 'Joke 8', status: 200 },
    { id: '9', joke: 'Joke 9', status: 200 },
    { id: '10', joke: 'Joke 10', status: 200 },
    { id: '11', joke: 'Joke 11', status: 200 },
  ];
  beforeEach(async () => {
    const jokeServiceMock = {
      getJokeList: jasmine.createSpy('getJokeList').and.returnValue(mockJokes)
    };
    await TestBed.configureTestingModule({
      declarations: [JokeListComponent],
      imports: [FormsModule, NgxPaginationModule],
      providers: [{provide: JokeService, useValue: jokeServiceMock}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeListComponent);
    component = fixture.componentInstance;
    jokeService = TestBed.inject(JokeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display corrent number of jokes', () => {
    component.itemsPerPage = 10;
    fixture.detectChanges();
    const jokeElements = fixture.debugElement.queryAll(By.css('.joke-list-item'));
    expect(jokeElements.length).toBe(10);
  });

  it('should update number of jokes displayed when selection changes', () => {
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = '5';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const jokeElements = fixture.debugElement.queryAll(By.css('.joke-list-item'));
    expect(jokeElements.length).toBe(5);
  });

});
