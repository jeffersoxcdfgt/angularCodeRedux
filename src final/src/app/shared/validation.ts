import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import {
  tap ,
  merge,
  catchError ,
  map ,
  mergeMap ,
  pluck ,
  distinct ,
  scan ,
  filter ,
  find ,
   mapTo ,
  toArray,
  concatMap ,
  zip ,
  delay ,
  switchMap,
  materialize,
  dematerialize,
  mergeAll
} from 'rxjs/operators';


export const cleanBlank = map((str:string)=>{
    if(!str){
      return "";
    }
    if(str){
      return str.replace(/[\s-]/g,"");
    }
});

export const ifEmpty = mergeMap((str:string) => iif(() => str.length === 0,of(false) , of(true)))
export const validObs =  filter(value=>value==true)
