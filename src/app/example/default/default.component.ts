import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QueryResult, query } from './graphql-query';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {
  public isDestroyed$: Subject<boolean> = new Subject<boolean>();
  public pokemon;

  constructor(private readonly apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .query<QueryResult>({
        query: query,
        variables: {}
      })
      .pipe(
        takeUntil(this.isDestroyed$),
        map(result => result.data.pokemon),
      )
      .subscribe( (pokemon: any) => {
        this.pokemon = pokemon;
      });
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }
}
