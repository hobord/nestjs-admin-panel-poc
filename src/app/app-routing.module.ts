import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'example',
    loadChildren: './example/example.module#ExampleModule'
  },
  { path: '**', loadChildren: './home/home.module#HomeModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        initialNavigation: 'enabled', // prevent blink in client side pre rendered page.
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        enableTracing: false // <-- debugging purposes only
      }
    )
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
