import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioViewComponent } from './orden-servicio-view.component';

describe('OrdenServicioViewComponent', () => {
  let component: OrdenServicioViewComponent;
  let fixture: ComponentFixture<OrdenServicioViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenServicioViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
