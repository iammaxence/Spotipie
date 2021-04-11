import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeyValue } from '@angular/common';


@Component({
  selector: 'cards-component',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

@Injectable()
export class CardsComponent implements OnInit {

  @Input()
  songs:any = [];

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
     
  }

  aboutThisSong(){
    console.log("Cick on : aboutThisSong");
  }

// Order by ascending property value (Because the pipe keyvalue do not order elements)
valueAscOrder = (entrie1: KeyValue<number,string>, entrie2: KeyValue<number,string>): number => {
  return entrie1.toString().localeCompare(entrie2.value);
}

  

}
