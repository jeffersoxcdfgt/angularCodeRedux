import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaSolidariaDetailComponent } from './persona-solidaria-detail.component';

describe('PersonaSolidariaDetailComponent', () => {
  let component: PersonaSolidariaDetailComponent;
  let fixture: ComponentFixture<PersonaSolidariaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaSolidariaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaSolidariaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
