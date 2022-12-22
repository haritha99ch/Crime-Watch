import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIndexPageComponent } from './report-index-page.component';

describe('ReportIndexPageComponent', () => {
  let component: ReportIndexPageComponent;
  let fixture: ComponentFixture<ReportIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
