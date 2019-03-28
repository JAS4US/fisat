import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mailtest1Component } from './mailtest1.component';

describe('Mailtest1Component', () => {
  let component: Mailtest1Component;
  let fixture: ComponentFixture<Mailtest1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mailtest1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mailtest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
