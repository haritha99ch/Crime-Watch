import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDataFormComponent } from './report-data-form.component';

describe('ReportDataFormComponent', () => {
  let component: ReportDataFormComponent;
  let fixture: ComponentFixture<ReportDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
