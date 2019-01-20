import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewclosedComponent } from './viewclosed.component';

describe('ViewclosedComponent', () => {
  let component: ViewclosedComponent;
  let fixture: ComponentFixture<ViewclosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewclosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewclosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
