import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceCitizenComponent } from './performance-citizen.component';

describe('PerformanceCitizenComponent', () => {
  let component: PerformanceCitizenComponent;
  let fixture: ComponentFixture<PerformanceCitizenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceCitizenComponent]
    });
    fixture = TestBed.createComponent(PerformanceCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
