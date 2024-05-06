import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarCocineroComponent } from './side-bar-cocinero.component';

describe('SideBarCocineroComponent', () => {
  let component: SideBarCocineroComponent;
  let fixture: ComponentFixture<SideBarCocineroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarCocineroComponent]
    });
    fixture = TestBed.createComponent(SideBarCocineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
