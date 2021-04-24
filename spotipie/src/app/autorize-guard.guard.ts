import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import {UploadPageComponent} from './upload-page/upload-page.component';

@Injectable({
  providedIn: 'root'
})
export class AutorizeGuardGuard implements CanActivate {

  private isvalid:boolean = false;

  constructor(private route: Router,private upc:UploadPageComponent){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      return false;
  }
  
}
