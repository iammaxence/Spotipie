import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

@Injectable()
export class SearchPageComponent implements OnInit {

  allsongs:any = [];
  cookie_user: string ="";

  constructor(private http: HttpClient,private route: ActivatedRoute,
    private cookieService: CookieService) { 

      this.cookie_user = document.cookie.split("=")[1];

      //Reload Page when URL change
      this.route.paramMap.subscribe(params => {
        this.searchASong();
      })
    }

  ngOnInit(): void {
    this.searchASong();
  }

  /**
   * Search a song
   * @description : Get All the songs relate to the search.
   */
  searchASong(){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*',
    })
   
    let params="song="+this.route.snapshot.params.str+"&cookie_user="+this.cookie_user;

    this.http.get<{ [key: string]: Number[] }>('http://localhost:8080/search?'+params,{headers: headers}).subscribe(
      resp => {

          var mymap = new Map();
          for(const i in resp){ 
            mymap.set(i,resp[i])
            
          } 
          //Sort by listening order (Descending order here) 
          this.allsongs = ([...mymap.entries()].sort((a, b) => b[1] - a[1]));
        },
    
      error => console.log(error)
    );
  }

}
