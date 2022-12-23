import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
