import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagoEditComponent } from './forma-pago-edit.component';

describe('FormaPagoEditComponent', () => {
  let component: FormaPagoEditComponent;
  let fixture: ComponentFixture<FormaPagoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaPagoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPagoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
