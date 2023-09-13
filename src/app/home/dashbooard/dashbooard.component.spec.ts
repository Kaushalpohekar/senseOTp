import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbooardComponent } from './dashbooard.component';

describe('DashbooardComponent', () => {
  let component: DashbooardComponent;
  let fixture: ComponentFixture<DashbooardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbooardComponent]
    });
    fixture = TestBed.createComponent(DashbooardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
