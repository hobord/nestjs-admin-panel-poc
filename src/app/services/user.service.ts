import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const PROFILE_QUERY = gql`
  query CurrentUser {
    whoAmI {
      id
      email
      roles
    }
  }
`;

export interface QueryResult {
  CurrentUser: {
    id: string;
    email: string;
    roles: string[];
  };
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) { }
  me() {
    return this.apollo.query<QueryResult>({
      query: PROFILE_QUERY,
      variables: {},
      fetchPolicy: 'network-only'
    })
    .pipe(
      map(result => result.data.CurrentUser),
    );
  }
}
