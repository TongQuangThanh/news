import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  apiUrl = 'https://thnvn-news.herokuapp.com';
  constructor(private http: HttpClient) { }

  getChildSource(path: string, parentCode: string, childCode: string) {
    return this.http.get(`${this.apiUrl}/${path}/${parentCode}/child/${childCode}`);
  }

  getParentSource(path: string, code: string) {
    return this.http.get(`${this.apiUrl}/${path}/${code}`);
  }

  getMultiParentSource(path: string, codeParent: string, codeSubParent: number[]) {
    return this.http.get(`${this.apiUrl}/${path}/${codeParent}/${[...codeSubParent]}`);
  }
}
