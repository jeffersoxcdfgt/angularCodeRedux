import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { selectAuthState } from '../store/reducers/auth.reducers';
import { LogIn } from '../store/actions/auth.actions';
import swal from 'sweetalert2';


@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  getState: Observable<any>;
  errorMessage: string | null;
  form: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        email:[''],
        password:['']
   });


    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      if(this.errorMessage!=null){
        swal.fire({ icon: 'error', title: 'Mensaje de error' , text:this.errorMessage })
      }
    });
  }

  onSubmit(): void {
    const payload = {
      email:`${this.form.get('email').value}`,
      password: `${this.form.get('password').value}`,
    };
    this.store.dispatch(new LogIn(payload));
  }

}
