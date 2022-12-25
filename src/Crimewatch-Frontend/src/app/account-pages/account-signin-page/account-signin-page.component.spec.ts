import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSigninPageComponent } from './account-signin-page.component';

describe('AccountSigninPageComponent', () => {
  let component: AccountSigninPageComponent;
  let fixture: ComponentFixture<AccountSigninPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSigninPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSigninPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
