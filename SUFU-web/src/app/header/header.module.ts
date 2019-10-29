import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [
      HeaderComponent,
      FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
      HeaderComponent,
      FooterComponent
  ]
})
export class HeaderModule { }
