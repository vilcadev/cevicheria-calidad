import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSuppliesComponent } from './manage-supplies.component';

describe('ManageSuppliesComponent', () => {
  let component: ManageSuppliesComponent;
  let fixture: ComponentFixture<ManageSuppliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSuppliesComponent]
    });
    fixture = TestBed.createComponent(ManageSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
