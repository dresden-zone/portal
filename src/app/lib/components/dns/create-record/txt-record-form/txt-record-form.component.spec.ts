import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtRecordFormComponent } from './txt-record-form.component';

describe('TxtRecordFormComponent', () => {
  let component: TxtRecordFormComponent;
  let fixture: ComponentFixture<TxtRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TxtRecordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TxtRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
