import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvaEditComponent } from './iva-edit.component';

describe('IvaEditComponent', () => {
  let component: IvaEditComponent;
  let fixture: ComponentFixture<IvaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
