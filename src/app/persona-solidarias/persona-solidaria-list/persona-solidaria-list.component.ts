import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { PersonaSolidaria } from '../shared/PersonaSolidaria';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  personasSolidariasActions from '../store/actions/personasSolidarias.actions';
import { getAllPersonasSolidarias } from '../store/reducers/personasSolidarias.reducers';


@Component({
  selector: 'app-persona-solidaria-list',
  templateUrl: './persona-solidaria-list.component.html',
  styleUrls: ['./persona-solidaria-list.component.css']
})
export class PersonaSolidariaListComponent implements OnInit {

  personaSolidarias : Observable<PersonaSolidaria[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.personaSolidarias = this.store.select(getAllPersonasSolidarias);
    this.personaSolidarias.subscribe( data =>{
          console.log(data)
    });
   }

}
