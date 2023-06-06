import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitPaymentComponent } from './emit-payment.component';

describe('EmitPaymentComponent', () => {
  let component: EmitPaymentComponent;
  let fixture: ComponentFixture<EmitPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmitPaymentComponent]
    });
    fixture = TestBed.createComponent(EmitPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
