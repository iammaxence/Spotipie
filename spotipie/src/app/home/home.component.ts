import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('moveTitle', [

      transition('void => *', [
        style({opacity: 0}),
        animate(3000)
      ])
    ])
  ]
})

@Injectable()
export class HomeComponent implements OnInit {

  //topsongs :{ [key: string]: Number[] } = {};
  topsongs:any = [];
  cookie_user:String ="";

  constructor(private http: HttpClient,private cookieService: CookieService) {
    this.cookie_user = document.cookie.split("=")[1];
    console.log("Le cookie : "+this.cookie_user);
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
    })

    this.http.get<{ [key: string]: Number[] }>('http://localhost:8080/top?num=3&cookie_user='+this.cookie_user,{headers: headers}).subscribe(
      (resp) => {
        var mymap = new Map();
        for(const i in resp){ 
          mymap.set(i,resp[i])
        }  
        this.topsongs = ([...mymap.entries()].sort((a, b) => b[1] - a[1]));
        console.log(this.topsongs)
      },
      (error) => {console.log("Error in home component (Get request involve");}
    );

    console.log(document.cookie);
  }

 

}
