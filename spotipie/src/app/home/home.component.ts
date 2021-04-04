import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  constructor() {

  }

  ngOnInit(): void {
    
  }

 

}
