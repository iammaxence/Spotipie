import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { AllsongsComponent } from './allsongs/allsongs.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AutorizeGuardGuard } from './autorize-guard.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search/:str', component: SearchPageComponent },
  { path: 'allsongs/:id', component: AllsongsComponent },
  { path: 'uploadfile', component: UploadPageComponent },
  { path: '', redirectTo: 'uploadfile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
