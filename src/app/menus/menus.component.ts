import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllMenus } from './store/actions/menus.actions';
import { getMenusError , getAllMenus } from './store/reducers/menus.reducers';
import { selectAuthState } from '../usuarios/store/reducers/auth.reducers';
import { Menu } from './shared/menu';
import { tap , map , toArray} from 'rxjs/operators';

@Component({
  selector:'app-menus',
  templateUrl:`./menus.component.html`,
  styleUrls:['./menus.component.css']
})
export class MenusComponent implements OnInit {
  userString:string = 'no esta loggueado'

  constructor(private router: Router ,
            private store :Store<AppState>){ }
  ngOnInit(){

    this.store.select(selectAuthState).subscribe((data)=>{
        if(data!=null && data.isAuthenticated==true){
          console.log(data)
          this.userString =data.user.email
        }
    })

    // subscriptions when success or error action
    this.store.select(getMenusError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(new GetAllMenus());
    this.store.select(getAllMenus).subscribe((data) =>{
        //console.log(data)
    })
  }

  /**
   * Display error message if load of menus fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of menus');
    }
  }

  /**
   * Display success message after execute specific action over the menu
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/menus']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }

}
