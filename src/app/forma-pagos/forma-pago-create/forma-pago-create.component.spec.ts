import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagoCreateComponent } from './forma-pago-create.component';

describe('FormaPagoCreateComponent', () => {
  let component: FormaPagoCreateComponent;
  let fixture: ComponentFixture<FormaPagoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaPagoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPagoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
