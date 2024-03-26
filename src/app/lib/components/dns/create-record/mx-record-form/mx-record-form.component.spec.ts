import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxRecordFormComponent } from './mx-record-form.component';

describe('MxRecordFormComponent', () => {
  let component: MxRecordFormComponent;
  let fixture: ComponentFixture<MxRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MxRecordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MxRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
