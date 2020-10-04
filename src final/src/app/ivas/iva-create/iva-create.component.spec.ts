import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvaCreateComponent } from './iva-create.component';

describe('IvaCreateComponent', () => {
  let component: IvaCreateComponent;
  let fixture: ComponentFixture<IvaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
