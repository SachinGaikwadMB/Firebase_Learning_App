import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { TextWrapPipe } from './pipes/text-wrap.pipe';


@NgModule({
  declarations: [
    NavbarComponent,
    TextWrapPipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports : [
    NavbarComponent,
    TextWrapPipe
  ]

})
export class SharedModule { }
