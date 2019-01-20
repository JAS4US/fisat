import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenComponent } from './reopen.component';

describe('ReopenComponent', () => {
  let component: ReopenComponent;
  let fixture: ComponentFixture<ReopenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReopenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
