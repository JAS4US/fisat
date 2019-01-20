import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingItemsComponent } from './testing-items.component';

describe('TestingItemsComponent', () => {
  let component: TestingItemsComponent;
  let fixture: ComponentFixture<TestingItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
