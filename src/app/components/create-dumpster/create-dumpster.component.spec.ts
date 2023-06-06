import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDumpsterComponent } from './create-dumpster.component';

describe('CreateDumpsterComponent', () => {
  let component: CreateDumpsterComponent;
  let fixture: ComponentFixture<CreateDumpsterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDumpsterComponent]
    });
    fixture = TestBed.createComponent(CreateDumpsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
