import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioDetailComponent } from './orden-servicio-detail.component';

describe('OrdenServicioDetailComponent', () => {
  let component: OrdenServicioDetailComponent;
  let fixture: ComponentFixture<OrdenServicioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenServicioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
