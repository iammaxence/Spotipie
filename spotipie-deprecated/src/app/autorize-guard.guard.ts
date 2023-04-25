import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AutorizeGuardGuard implements CanActivate {

  private isvalid:boolean = false;

  constructor(private route: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let cookie_user= document.cookie.split("=")[1];

      if(cookie_user != undefined && cookie_user != ""){
        return true;
      }

      this.route.navigate(['uploadfile']);
      return false;
  }
  
}
