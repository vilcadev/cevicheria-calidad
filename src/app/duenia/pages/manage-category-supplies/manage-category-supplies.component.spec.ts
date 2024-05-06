import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategorySuppliesComponent } from './manage-category-supplies.component';

describe('ManageCategorySuppliesComponent', () => {
  let component: ManageCategorySuppliesComponent;
  let fixture: ComponentFixture<ManageCategorySuppliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCategorySuppliesComponent]
    });
    fixture = TestBed.createComponent(ManageCategorySuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
