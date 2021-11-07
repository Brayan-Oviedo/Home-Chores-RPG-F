import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { filterProvider } from 'src/app/core/filter.service';


@NgModule({
  declarations: [],
  exports: [
    HttpClientModule,
    CommonModule,
    BrowserModule
  ],
  providers: [
    filterProvider
  ]
})
export class CoreModule { }
