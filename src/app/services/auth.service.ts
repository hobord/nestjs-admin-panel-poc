import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const LOGIN_QUERY =  gql`
query CurrentUser($username:String!, $password: String!) {
  login(username:$username, password:$password) {
    access_token
  }
}
`;
export interface LoginQueryResult {
  access_token?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean;
  constructor(private apollo: Apollo) {
    // this.loggedIn = false;
  }
  login(username: string, password: string) {
    this.apollo.query<LoginQueryResult>({
      query: LOGIN_QUERY,
      variables: {
        username,
        password
      },
      fetchPolicy: 'network-only'
    })
    .pipe(
      map(result => result.data.access_token),
    ).subscribe((access_token) => {
      if (access_token) {
        this.loggedIn = true;
        localStorage.setItem('token', access_token);
      }
    });
  }

  logout() {
    this.apollo.getClient().resetStore();
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
