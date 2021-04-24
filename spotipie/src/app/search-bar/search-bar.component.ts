import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

@Injectable()
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;

  allsongs:any = [];

  @ViewChild("searchSongId") trackname!: ElementRef;

  constructor(private router: Router,private fb: FormBuilder) { 

      this.searchForm= this.fb.group({
        searchInput: ['', [Validators.required, Validators.minLength(1)]]
      })

      this.searchForm.valueChanges.subscribe();

    }

  ngOnInit(): void {
    
  }

  /**
   * @description Go to search page
   * @paramUrl : trackname to make the search
   */
  searchASong(){
    //We need the reference of the input search to call the Search Page route with the new trackname
    if(this.trackname == undefined || this.trackname.nativeElement.value=="")
      return;
    
    this.router.navigateByUrl('/search/'+this.trackname.nativeElement.value);
  }
  
}
