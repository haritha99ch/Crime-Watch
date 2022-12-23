import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCreatePageComponent } from './report-create-page.component';

describe('ReportCreatePageComponent', () => {
  let component: ReportCreatePageComponent;
  let fixture: ComponentFixture<ReportCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
