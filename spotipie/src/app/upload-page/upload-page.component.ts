import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'upload-page-component',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {

  isvalid: Boolean = false;

  constructor(private router:Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  submit(){
    this.router.navigate(['/home']) //your router URL need to pass it here
  }

  goToHomeRoute() {
    if(this.isvalid)
      this.router.navigate(['home']);
    else
      console.log("Invalid zip ! ")
  }

  public uploadFileToServer(event:any) {
    let fileList: FileList = event.target.files;
    console.log(fileList)

    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('fileType', 'zip');

      const headers = new HttpHeaders({
        'Accept' : 'application/json',
      })
      console.log(formData)
      this.http.post('http://localhost:8080/uploadfile', formData, {headers:headers})
        .subscribe(
        data => {console.log(data); if(data) this.isvalid=true},
        error => console.log(error)
        )
    }
  } 

}
