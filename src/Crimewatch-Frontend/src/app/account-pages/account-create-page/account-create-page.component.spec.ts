import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreatePageComponent } from './account-create-page.component';

describe('AccountCreatePageComponent', () => {
  let component: AccountCreatePageComponent;
  let fixture: ComponentFixture<AccountCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
