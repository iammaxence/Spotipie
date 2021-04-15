import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router'; 

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

@Injectable()
export class SearchPageComponent implements OnInit {

  allsongs:any = [];

  @ViewChild("searchSongId") trackname!: ElementRef;

  constructor(private http: HttpClient,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.searchASong()
  }

  searchASong(){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*',
    })
   
    let params="song=";
    if(this.trackname == undefined)
      params+= this.route.snapshot.params.str;
    else if (this.trackname.nativeElement.value!='')
      this.router.navigateByUrl('/search/'+this.trackname.nativeElement.value)
    else
      return;

    this.http.get<{ [key: string]: Number[] }>('http://localhost:8080/search?'+params,{headers: headers}).subscribe(
      resp => {

          var mymap = new Map();
          for(const i in resp){ 
            mymap.set(i,resp[i])
            
          }  
          this.allsongs = ([...mymap.entries()].sort((a, b) => b[1] - a[1]));
        },
    
      error => console.log(error)
    );
  }

}
