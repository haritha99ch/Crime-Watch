import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEvidenceItemComponent } from './report-evidence-item.component';

describe('ReportEvidenceItemComponent', () => {
  let component: ReportEvidenceItemComponent;
  let fixture: ComponentFixture<ReportEvidenceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEvidenceItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEvidenceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
