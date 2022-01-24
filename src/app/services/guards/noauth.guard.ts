import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class Noauth implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router, private AFauth: AngularFireAuth) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
     return this.AFauth.authState.pipe(map( auth =>{
      //Desición para permitir acceso a los Tabs
      if(!auth){ 
        return true;
      }else{
        this.router.navigateByUrl('/');
        return false;  
      }    
    }))
      
      
  }
  
  
}
