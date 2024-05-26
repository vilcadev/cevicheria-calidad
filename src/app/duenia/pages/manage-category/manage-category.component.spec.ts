import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryComponent } from './manage-category.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DueniaService } from '../../services/duenia.service';
import { By } from '@angular/platform-browser';

describe('ManageCategoryComponent', () => {
  let component: ManageCategoryComponent;
  let fixture: ComponentFixture<ManageCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCategoryComponent],
      imports:[HttpClientModule],
      providers:[
        MessageService,
        DueniaService
      ]
    });
    fixture = TestBed.createComponent(ManageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('deberia cambiar el estado del modal', ()=>{
    // * css se está utilizando para seleccionar un elemento dentro de la estructura del DOM generada por Angular para el componente que está siendo probado.
    const btnDe = fixture.debugElement.query(By.css('#btnSelect'));

    btnDe.triggerEventHandler('click');
    // fixture.detectChanges();

    expect(component.visible).toBe(true);

  });

});
