import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  // API URL
  url: String = 'https://v-farm.herokuapp.com/api' ; // 'http://localhost:3000/api';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: HttpParams) {
    // console.log('params ' + JSON.stringify(params));
    // console.log('reqOpts ' + JSON.stringify(reqOpts));
    // if (!reqOpts) {
    //   reqOpts = {
    //     params: new HttpParams()
    //   };
    // }

    // // Support easy query params for GET requests
    // if (params) {
    //   reqOpts.params = new HttpParams();
    //   // tslint:disable-next-line:forin
    //   for (const k in params) {
    //     console.log(k);
    //     reqOpts.params.set(k, params[k]);
    //   }
    // }

    // console.log(JSON.stringify(reqOpts));

    return this.http.get(this.url + '/' + endpoint, { params: params });
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
    });
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
