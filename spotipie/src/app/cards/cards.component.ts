import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';


@Component({
  selector: 'cards-component',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

@Injectable()
export class CardsComponent implements OnInit {

  @Input()
  songs :{ [key: string]: any[] } = {};

  constructor() { }

  ngOnInit(): void {
   
  }

  aboutThisSong(){
    console.log("Cick on : aboutThisSong");
  }

}
