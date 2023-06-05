import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCitizenComponent } from './info-citizen.component';

describe('InfoCitizenComponent', () => {
  let component: InfoCitizenComponent;
  let fixture: ComponentFixture<InfoCitizenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoCitizenComponent]
    });
    fixture = TestBed.createComponent(InfoCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
