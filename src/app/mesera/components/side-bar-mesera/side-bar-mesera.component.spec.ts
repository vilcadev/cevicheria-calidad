import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarMeseraComponent } from './side-bar-mesera.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';

describe('SideBarMeseraComponent', () => {
  let component: SideBarMeseraComponent;
  let fixture: ComponentFixture<SideBarMeseraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarMeseraComponent],
      imports:[HttpClientModule],
      providers:[
        AuthService
      ]
    });
    fixture = TestBed.createComponent(SideBarMeseraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
