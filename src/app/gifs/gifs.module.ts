import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search-box/search-box.component';
import { HomePageComponent } from './pages/components/home/home-page.component';
import { ListComponent } from './components/card/list.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchComponent,
    ListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
