import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioEditComponent } from './municipio-edit.component';

describe('MunicipioEditComponent', () => {
  let component: MunicipioEditComponent;
  let fixture: ComponentFixture<MunicipioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
