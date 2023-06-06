import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminComunaleComponent } from './home-admin-comunale.component';

describe('HomeAdminComunaleComponent', () => {
  let component: HomeAdminComunaleComponent;
  let fixture: ComponentFixture<HomeAdminComunaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminComunaleComponent]
    });
    fixture = TestBed.createComponent(HomeAdminComunaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
