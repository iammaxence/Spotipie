import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

@Injectable()
export class CookieAuthService {

    cookie_user: string = "";

    constructor() {}

    public getCookieUser(){
        return this.cookie_user;
    }


}