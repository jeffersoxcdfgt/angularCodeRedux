import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaSolidariaEditComponent } from './persona-solidaria-edit.component';

describe('PersonaSolidariaEditComponent', () => {
  let component: PersonaSolidariaEditComponent;
  let fixture: ComponentFixture<PersonaSolidariaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaSolidariaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaSolidariaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
