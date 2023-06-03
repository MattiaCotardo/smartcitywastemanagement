import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCitizenComponent } from './home-citizen.component';

describe('HomeCitizenComponent', () => {
  let component: HomeCitizenComponent;
  let fixture: ComponentFixture<HomeCitizenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCitizenComponent]
    });
    fixture = TestBed.createComponent(HomeCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
