import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoListComponent } from './contrato-list.component';

describe('ContratoListComponent', () => {
  let component: ContratoListComponent;
  let fixture: ComponentFixture<ContratoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
