import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletedComponent } from './view-completed.component';

describe('ViewCompletedComponent', () => {
  let component: ViewCompletedComponent;
  let fixture: ComponentFixture<ViewCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
