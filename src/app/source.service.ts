/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { source } from './shared/source';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/html',
    }),
    responseType: 'text'
  };
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('24h.com.vn/upload/rss/thethao.rss', {
      headers: new HttpHeaders({
        Accept: 'text/html',
      }),
      responseType: 'text'
    });
  }
}
// {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
//   responseType: 'json'
// }
// options: {
//   headers?: HttpHeaders | {[header: string]: string | string[]},
//   observe?: 'body' | 'events' | 'response',
//   params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
//   reportProgress?: boolean,
//   responseType?: 'arraybuffer'|'blob'|'json'|'text',
//   withCredentials?: boolean,
// }
