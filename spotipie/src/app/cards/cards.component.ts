import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'cards-component',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

@Injectable()
export class CardsComponent implements OnInit {

  topsongs :{ [key: string]: any[] } = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
    })

    this.http.get<{ [key: string]: any[] }>('http://localhost:8080/top?num=20',{headers: headers}).subscribe(
      resp => {
        for(const i in resp){ 
          this.topsongs[i]=resp[i]
          
        }  
        console.log(this.topsongs)
      }
    );
  }

  aboutThisSong(){
    console.log("Cick on : aboutThisSong");
  }

}
