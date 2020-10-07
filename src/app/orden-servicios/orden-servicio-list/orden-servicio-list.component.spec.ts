import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioListComponent } from './orden-servicio-list.component';

describe('OrdenServicioListComponent', () => {
  let component: OrdenServicioListComponent;
  let fixture: ComponentFixture<OrdenServicioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenServicioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
