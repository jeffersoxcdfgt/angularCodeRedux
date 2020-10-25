import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaRoleListComponent } from './persona-role-list.component';

describe('PersonaRoleListComponent', () => {
  let component: PersonaRoleListComponent;
  let fixture: ComponentFixture<PersonaRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaRoleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
