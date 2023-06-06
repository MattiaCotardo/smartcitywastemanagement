import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminAziendaleComponent } from './home-admin-aziendale.component';

describe('HomeAdminAziendaleComponent', () => {
  let component: HomeAdminAziendaleComponent;
  let fixture: ComponentFixture<HomeAdminAziendaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminAziendaleComponent]
    });
    fixture = TestBed.createComponent(HomeAdminAziendaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
