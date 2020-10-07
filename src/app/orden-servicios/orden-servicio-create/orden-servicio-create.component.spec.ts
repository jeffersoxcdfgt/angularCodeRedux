import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioCreateComponent } from './orden-servicio-create.component';

describe('OrdenServicioCreateComponent', () => {
  let component: OrdenServicioCreateComponent;
  let fixture: ComponentFixture<OrdenServicioCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenServicioCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
