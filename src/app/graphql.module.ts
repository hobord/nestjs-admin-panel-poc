import {NgModule, Inject, PLATFORM_ID, Optional} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink, HttpLinkHandler} from 'apollo-angular-link-http';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import { EnvService, IEnvDTO } from './services/env.service';

// const introspectionQueryResultData = require('src/app/entities/GraphQL/graphql.fragmentTypes.json');



@NgModule({
  exports: [ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  cache: InMemoryCache;
  link: HttpLinkHandler;

  constructor(
    private readonly apollo: Apollo,
    private readonly httpLink: HttpLink,
    private readonly envService: EnvService,
    ) {
    const fragmentMatcher = new IntrospectionFragmentMatcher({});
    this.cache = new InMemoryCache({ fragmentMatcher });


    envService.getConfig().subscribe((env: IEnvDTO) => {
      // const uri = 'http://localhost:3000/graphql';
      const uri = env.graphSRV;
      this.link = this.httpLink.create({ uri });

      this.apollo.create({
        link: this.link,
        cache: this.cache,
        ssrForceFetchDelay: 200,
      });
    });

  }
}
