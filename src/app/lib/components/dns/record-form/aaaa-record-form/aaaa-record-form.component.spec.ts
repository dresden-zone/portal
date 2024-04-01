import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaaaRecordFormComponent } from './aaaa-record-form.component';

describe('AaaaRecordFormComponent', () => {
  let component: AaaaRecordFormComponent;
  let fixture: ComponentFixture<AaaaRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AaaaRecordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AaaaRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
