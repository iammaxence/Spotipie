import { Component, OnInit } from '@angular/core';
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

export class HomeComponent implements OnInit {

  topsongs: string[]= [
    "Hwasa",
    "Booba",
    "Maes"
  ];

  constructor() { }

  ngOnInit(): void {
  }

  aboutThisSong(){
    console.log("Cick on : aboutThisSong");
  }

}
