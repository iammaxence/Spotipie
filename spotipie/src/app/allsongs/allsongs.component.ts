import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  numberOfSongInOnePage:number= 20;  

  numberOfPages:number = 0;

  allsongs:any = [];
  
  @Input()
  id:number=0;

  @ViewChild("searchSongId") trackname!: ElementRef;

  ngOnInit(): void {

    this.checkNumberOfSongs();

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.loadPage(this.id);
        }
      );
  }

  /**
   * @description : Get the number of song to calculate the number of pages needeed
   *
   */
  checkNumberOfSongs(){

    this.http.get<any[]>('http://localhost:8080/numberOfSongs').subscribe(
      resp => this.numberOfPages=(+resp/20),
      error => console.log(error)
    );
  }

  /**
   * Load the page of songs
   * @param id : Num of the page
   */
  loadPage(id:number){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
    })

    const params="page="+this.id.toString()+"&nbElementByPage="+this.numberOfSongInOnePage;

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
