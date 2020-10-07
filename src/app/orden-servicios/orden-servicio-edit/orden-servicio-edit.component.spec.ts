import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioEditComponent } from './orden-servicio-edit.component';

describe('OrdenServicioEditComponent', () => {
  let component: OrdenServicioEditComponent;
  let fixture: ComponentFixture<OrdenServicioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenServicioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
