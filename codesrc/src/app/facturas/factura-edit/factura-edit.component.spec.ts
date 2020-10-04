import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaEditComponent } from './factura-edit.component';

describe('FacturaEditComponent', () => {
  let component: FacturaEditComponent;
  let fixture: ComponentFixture<FacturaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
