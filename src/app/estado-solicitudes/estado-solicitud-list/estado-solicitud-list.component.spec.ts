import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoSolicitudListComponent } from './estado-solicitud-list.component';

describe('EstadoSolicitudListComponent', () => {
  let component: EstadoSolicitudListComponent;
  let fixture: ComponentFixture<EstadoSolicitudListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoSolicitudListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoSolicitudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
