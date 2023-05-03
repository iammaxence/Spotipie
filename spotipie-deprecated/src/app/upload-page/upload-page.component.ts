import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IdService } from '../Authentification/IdService';

@Component({
  selector: 'upload-page-component',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {

  isvalid: boolean = false;
  isvalidSize: boolean = true;

  user_cookie: string = "";

  constructor(private router:Router, private http: HttpClient,private cookieService: CookieService,
    private idservice: IdService) { }

  ngOnInit(): void {
    
  }

  private createCookieAuth(){
    let DoesCookieExistForThisUser = document.cookie;


   if(DoesCookieExistForThisUser){
    this.user_cookie= document.cookie;
   }
   else {
    let random_unique_id = this.idservice.generate();
    this.user_cookie = random_unique_id;
    this.cookieService.set( 'user_id', random_unique_id );
   }

  }

  submit(){
    this.router.navigate(['/home']) //your router URL need to pass it here
  }

  goToHomeRoute() {
    if(this.isvalid)
      this.router.navigate(['home']);
    else
      console.log("Invalid zip ! "+this.isvalid)
  }

  get IsValid(){
    return this.isvalid;
  }


  /**
   * 
   * @param event 
   * @returns "Success" if the file have been upload successfuly
   */
  public uploadFileToServer(event:any) {

    //Create a cookie : Cookie is associate to the file. So each user can only see his files

    this.createCookieAuth()

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];

    // If the size of the file is >20mb, it's not a valid file
    if(!this.fileSizeValidation(file)){
      this.isvalidSize=false;
      return;
    }
    else {
      this.isvalidSize=true;
    }

    if (fileList.length > 0 ) {
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('fileType', 'zip');

      formData.append('cookie',this.user_cookie);

      const headers = new HttpHeaders({
        'Accept' : 'application/json',
      })
      console.log("form : "+ formData)
      this.http.post('http://localhost:8080/uploadfile', formData, {headers:headers})
        .subscribe(
        data => {console.log("data: "+ data); this.isvalid=true; },
        error => console.log(error)
        )
    }
    
  } 
  
  /**
   * 
   * @param file 
   * @returns True if the size is valid, else False
   */
  private fileSizeValidation(file: File){
    
    const fileSizeInKB = Math.round(file.size / 1024)/1000;
    console.log("file size = " + fileSizeInKB);
    // if (fileSizeInKB >= 2000) {
    //   return false;
    // }
    
    return true;
  }

}