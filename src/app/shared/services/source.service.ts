import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getChildSource(path: string, parentCode: string, childCode: string) {
    return this.http.get(`${this.apiUrl}/${path}/${parentCode}/child/${childCode}`);
  }

  getParentSource(path: string, code: string) {
    return this.http.get(`${this.apiUrl}/${path}/${code}`);
  }
}
