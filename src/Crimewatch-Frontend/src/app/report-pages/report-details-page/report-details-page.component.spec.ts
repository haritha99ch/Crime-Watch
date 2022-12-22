import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailsPageComponent } from './report-details-page.component';

describe('ReportDetailsPageComponent', () => {
  let component: ReportDetailsPageComponent;
  let fixture: ComponentFixture<ReportDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
