import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceCreateItemComponent } from './evidence-create-item.component';

describe('EvidenceCreateItemComponent', () => {
  let component: EvidenceCreateItemComponent;
  let fixture: ComponentFixture<EvidenceCreateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceCreateItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceCreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
