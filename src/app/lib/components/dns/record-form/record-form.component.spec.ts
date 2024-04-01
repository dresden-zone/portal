import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFormComponent } from './record-form.component';

describe('CreateRecordComponent', () => {
  let component: RecordFormComponent;
  let fixture: ComponentFixture<RecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
