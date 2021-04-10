import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'cards-component',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

@Injectable()
export class CardsComponent implements OnInit {

  @Input()
  songs :{ [key: string]: any[] } = {};

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
   
  }

  aboutThisSong(){
    console.log("Cick on : aboutThisSong");
  }

  

}
