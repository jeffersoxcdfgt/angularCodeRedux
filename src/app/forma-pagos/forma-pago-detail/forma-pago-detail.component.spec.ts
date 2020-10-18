import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagoDetailComponent } from './forma-pago-detail.component';

describe('FormaPagoDetailComponent', () => {
  let component: FormaPagoDetailComponent;
  let fixture: ComponentFixture<FormaPagoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaPagoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPagoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
