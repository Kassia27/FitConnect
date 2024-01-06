import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessOptionsPage } from './access-options.page';

describe('AccessOptionsPage', () => {
  let component: AccessOptionsPage;
  let fixture: ComponentFixture<AccessOptionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccessOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
