import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'allsongs-component',
  templateUrl: './allsongs.component.html',
  styleUrls: ['./allsongs.component.css']
})

@Injectable()
export class AllsongsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  allsongs:any = [];

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
    })

    this.http.get<{ [key: string]: Number[] }>('http://localhost:8080/top?num=3',{headers: headers}).toPromise().then(
      resp => {
        var mymap = new Map();
        for(const i in resp){ 
          mymap.set(i,resp[i])
        }  
        this.allsongs = ([...mymap.entries()].sort((a, b) => b[1] - a[1]));
        console.log(this.allsongs)
      }
    );
  }

}
