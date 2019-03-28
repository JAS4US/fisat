import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImguploadtestComponent } from './imguploadtest.component';

describe('ImguploadtestComponent', () => {
  let component: ImguploadtestComponent;
  let fixture: ComponentFixture<ImguploadtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImguploadtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImguploadtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
