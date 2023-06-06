import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchCitizenComponent } from './research-citizen.component';

describe('ResearchCitizenComponent', () => {
  let component: ResearchCitizenComponent;
  let fixture: ComponentFixture<ResearchCitizenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchCitizenComponent]
    });
    fixture = TestBed.createComponent(ResearchCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
