import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { PersonaRol } from '../shared/PersonaRol';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  personasRolActions from '../store/actions/personas-rol.actions';
import { getAllPersonasRol } from '../store/reducers/personas-rol.reducers';

@Component({
  selector: 'app-persona-role-list',
  templateUrl: './persona-role-list.component.html',
  styleUrls: ['./persona-role-list.component.css']
})
export class PersonaRoleListComponent implements OnInit {
  personasrol: Observable<PersonaRol[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.personasrol = this.store.select(getAllPersonasRol);
    this.personasrol.subscribe( data =>{
          console.log(data)
    });
  }
}
