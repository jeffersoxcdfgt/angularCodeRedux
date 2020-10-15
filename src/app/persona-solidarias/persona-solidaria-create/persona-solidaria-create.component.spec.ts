import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaSolidariaCreateComponent } from './persona-solidaria-create.component';

describe('PersonaSolidariaCreateComponent', () => {
  let component: PersonaSolidariaCreateComponent;
  let fixture: ComponentFixture<PersonaSolidariaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaSolidariaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaSolidariaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
