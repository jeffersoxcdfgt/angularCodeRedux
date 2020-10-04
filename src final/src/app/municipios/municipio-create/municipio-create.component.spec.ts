import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioCreateComponent } from './municipio-create.component';

describe('MunicipioCreateComponent', () => {
  let component: MunicipioCreateComponent;
  let fixture: ComponentFixture<MunicipioCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
