import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagoListComponent } from './forma-pago-list.component';

describe('FormaPagoListComponent', () => {
  let component: FormaPagoListComponent;
  let fixture: ComponentFixture<FormaPagoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaPagoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPagoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
