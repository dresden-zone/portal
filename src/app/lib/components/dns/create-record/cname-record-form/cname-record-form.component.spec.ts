import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnameRecordFormComponent } from './cname-record-form.component';

describe('CnameRecordFormComponent', () => {
  let component: CnameRecordFormComponent;
  let fixture: ComponentFixture<CnameRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CnameRecordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CnameRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
