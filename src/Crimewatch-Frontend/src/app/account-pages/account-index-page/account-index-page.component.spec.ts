import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountIndexPageComponent } from './account-index-page.component';

describe('AccountIndexPageComponent', () => {
  let component: AccountIndexPageComponent;
  let fixture: ComponentFixture<AccountIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
