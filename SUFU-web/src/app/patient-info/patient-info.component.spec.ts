import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatienatInfoComponent } from './patient-info.component';

describe('LoginPageComponent', () => {
  let component: PatienatInfoComponent;
  let fixture: ComponentFixture<PatienatInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatienatInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatienatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
