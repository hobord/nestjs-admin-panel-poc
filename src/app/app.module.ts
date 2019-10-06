import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';
// import { EnvService } from './services/env.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    GraphQLModule,
    HttpLinkModule,
    AppRoutingModule,
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory: (httpLink: HttpLink) => {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: httpLink.create({
    //         uri: 'https://o5x5jzoo7z.sse.codesandbox.io/graphql'
    //       })
    //     };
    //   },
    //   deps: [HttpLink]
    // }
    // { provide: EnvService, useClass: EnvService }
    // EnvService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
