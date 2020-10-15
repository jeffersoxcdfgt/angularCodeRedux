import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaSolidariaListComponent } from './persona-solidaria-list.component';

describe('PersonaSolidariaListComponent', () => {
  let component: PersonaSolidariaListComponent;
  let fixture: ComponentFixture<PersonaSolidariaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaSolidariaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaSolidariaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
