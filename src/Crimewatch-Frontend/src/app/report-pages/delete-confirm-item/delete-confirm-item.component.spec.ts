import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmItemComponent } from './delete-confirm-item.component';

describe('DeleteConfirmItemComponent', () => {
  let component: DeleteConfirmItemComponent;
  let fixture: ComponentFixture<DeleteConfirmItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
