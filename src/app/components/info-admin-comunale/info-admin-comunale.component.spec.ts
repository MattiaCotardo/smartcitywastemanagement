import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdminComunaleComponent } from './info-admin-comunale.component';

describe('InfoAdminComunaleComponent', () => {
  let component: InfoAdminComunaleComponent;
  let fixture: ComponentFixture<InfoAdminComunaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoAdminComunaleComponent]
    });
    fixture = TestBed.createComponent(InfoAdminComunaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
