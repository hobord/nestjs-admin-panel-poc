import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { ExampleRoutingModule } from './example-routing.module';



@NgModule({
  declarations: [DefaultComponent],
  imports: [
    ExampleRoutingModule,
    CommonModule
  ]
})
export class ExampleModule { }
