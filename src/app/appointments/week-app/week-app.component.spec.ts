import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekAppComponent } from './week-app.component';

describe('WeekAppComponent', () => {
  let component: WeekAppComponent;
  let fixture: ComponentFixture<WeekAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
