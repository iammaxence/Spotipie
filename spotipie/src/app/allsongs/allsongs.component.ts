import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router'; 

@Component({
  selector: 'allsongs-component',
  templateUrl: './allsongs.component.html',
  styleUrls: ['./allsongs.component.css']
})

@Injectable()
export class AllsongsComponent implements OnInit {

  constructor(private http: HttpClient,private route: ActivatedRoute) { }

  allsongs:any = [];
  
  @Input()
  id:number=0;

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.loadPage(this.id);
        }
      );

  
  }

  loadPage(id:number){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
    })

    const params="page="+this.id.toString()+"&nbElementByPage=20";

    this.http.get<{ [key: string]: Number[] }>('http://localhost:8080/songsByPages?'+params,{headers: headers}).toPromise().then(
      resp => {

        var mymap = new Map();
        for(const i in resp){ 
          mymap.set(i,resp[i])
          
        }  
        this.allsongs = ([...mymap.entries()].sort((a, b) => b[1] - a[1]));
      }
    );

  }

}
