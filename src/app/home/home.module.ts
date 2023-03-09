import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LinkCardComponent } from './link-card/card-link.component';

@NgModule({
  declarations: [HomeComponent, LinkCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LinkCardComponent
  ]
})
export class HomeModule { }
