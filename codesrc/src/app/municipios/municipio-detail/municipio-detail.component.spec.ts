import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioDetailComponent } from './municipio-detail.component';

describe('MunicipioDetailComponent', () => {
  let component: MunicipioDetailComponent;
  let fixture: ComponentFixture<MunicipioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
