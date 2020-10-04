import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaDetailComponent } from './zona-detail.component';

describe('ZonaDetailComponent', () => {
  let component: ZonaDetailComponent;
  let fixture: ComponentFixture<ZonaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
