import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ARecordFormComponent } from './a-record-form.component';

describe('ARecordFormComponent', () => {
  let component: ARecordFormComponent;
  let fixture: ComponentFixture<ARecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ARecordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ARecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
