import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IEnvDTO {
  graphSRV: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  configUrl = '/api/env';

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
/*
const envServiceFactory = (http: HttpClient) => {
  return new EnvService(http);
};

export let envServiceProvider = {
  provide: EnvService,
  useFactory: envServiceFactory,
  deps: [HttpClient]
};
*/
