import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarMeseraComponent } from './side-bar-mesera.component';

describe('SideBarMeseraComponent', () => {
  let component: SideBarMeseraComponent;
  let fixture: ComponentFixture<SideBarMeseraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarMeseraComponent]
    });
    fixture = TestBed.createComponent(SideBarMeseraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
