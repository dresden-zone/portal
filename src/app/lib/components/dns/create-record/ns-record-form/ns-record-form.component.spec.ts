import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsRecordFormComponent } from './ns-record-form.component';

describe('NsRecordFormComponent', () => {
  let component: NsRecordFormComponent;
  let fixture: ComponentFixture<NsRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsRecordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NsRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
