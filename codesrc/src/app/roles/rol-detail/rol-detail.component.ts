import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Rol } from '../shared/rol';
import { getRol } from '../store/reducers/roles.reducers';
import {  Observable  } from 'rxjs';
import {  GetRol } from '../store/actions/roles.actions';


@Component({
  selector: 'app-rol-detail',
  templateUrl: './rol-detail.component.html',
  styleUrls: ['./rol-detail.component.css']
})
export class RolDetailComponent implements OnInit {
  rol:Observable<Rol>;

  constructor(private route: ActivatedRoute ,
              private store: Store<AppState>){
  }

  ngOnInit() {
      this.route.params.subscribe( params => {
          this.store.dispatch(new GetRol(+params['id']))
      });
      this.rol=this.store.select(getRol);
  }

}
