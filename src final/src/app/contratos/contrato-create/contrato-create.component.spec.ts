import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoCreateComponent } from './contrato-create.component';

describe('ContratoCreateComponent', () => {
  let component: ContratoCreateComponent;
  let fixture: ComponentFixture<ContratoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
