import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

//components
import { PageNotFoundComponent }  from './not-found/not-found.component';


//services
import { HTTP_INTERCEPTORS , HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ExtractNamesPipe } from './extract-names.pipe';
import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StoreModule } from '@ngrx/store';


@NgModule({
  imports:[
    CommonModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //StoreModule,
    //EffectsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

  ],
  declarations:[
    PageNotFoundComponent,
    ExtractNamesPipe
  ],
  providers:[],
  exports:[
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //StoreModule,
    //EffectsModule,
    PageNotFoundComponent,
    ExtractNamesPipe
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule{

}
