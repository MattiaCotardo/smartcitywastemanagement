import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdminAziendaleComponent } from './info-admin-aziendale.component';

describe('InfoAdminAziendaleComponent', () => {
  let component: InfoAdminAziendaleComponent;
  let fixture: ComponentFixture<InfoAdminAziendaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoAdminAziendaleComponent]
    });
    fixture = TestBed.createComponent(InfoAdminAziendaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
