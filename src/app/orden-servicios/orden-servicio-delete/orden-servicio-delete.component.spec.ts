import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioDeleteComponent } from './orden-servicio-delete.component';

describe('OrdenServicioDeleteComponent', () => {
  let component: OrdenServicioDeleteComponent;
  let fixture: ComponentFixture<OrdenServicioDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenServicioDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
