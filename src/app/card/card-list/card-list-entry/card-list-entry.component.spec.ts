import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListEntryComponent } from './card-list-entry.component';

describe('CardListEntryComponent', () => {
  let component: CardListEntryComponent;
  let fixture: ComponentFixture<CardListEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
