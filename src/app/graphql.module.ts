import {NgModule, Inject, PLATFORM_ID, Optional} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink, HttpLinkHandler} from 'apollo-angular-link-http';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import { EnvService, IEnvDTO } from './services/env.service';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';

// const introspectionQueryResultData = require('src/app/entities/GraphQL/graphql.fragmentTypes.json');

const auth = setContext(async(_, { headers }) => {
  // Grab token if there is one in storage or hasn't expired
  let token = this.auth.getCachedAccessToken();

  if (!token) {
    // An observable to fetch a new token
    // Converted .toPromise()
    await this.auth.acquireToken().toPromise();

    // Set new token to the response (adal puts the new token in storage when fetched)
    token = this.auth.getCachedAccessToken();
  }
  // Return the headers as usual
  return {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  };
});

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  cache: InMemoryCache;

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
      const http = this.httpLink.create({ uri });

      const authLink = new ApolloLink((operation, forward) => {
        // Get the authentication token from local storage if it exists
        const token = localStorage.getItem('token');

        // Use the setContext method to set the HTTP headers.
        operation.setContext({
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });

        // Call the next link in the middleware chain.
        return forward(operation);
      });

      this.apollo.create({
        link: authLink.concat(http),
        cache: this.cache,
        ssrForceFetchDelay: 200,
      });
    });

  }
}
