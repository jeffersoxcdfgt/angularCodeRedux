import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSolicitudListComponent } from './tipo-solicitud-list.component';

describe('TipoSolicitudListComponent', () => {
  let component: TipoSolicitudListComponent;
  let fixture: ComponentFixture<TipoSolicitudListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoSolicitudListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSolicitudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
