import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvaDetailComponent } from './iva-detail.component';

describe('IvaDetailComponent', () => {
  let component: IvaDetailComponent;
  let fixture: ComponentFixture<IvaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
