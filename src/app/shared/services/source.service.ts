import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespondData, RespondGroup, RespondMulti, RespondSource } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  apiUrl = 'https://thnvn-news.herokuapp.com';
  // apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getCategory(path: string): Observable<RespondSource | RespondGroup> {
    return this.http.get<RespondSource | RespondGroup>(`${this.apiUrl}/${path}`);
  }

  getParentSource(path: string, code: string): Observable<RespondData> {
    return this.http.get<RespondData>(`${this.apiUrl}/${path}/${code}`);
  }

  getMultiParentSource(path: string, codeParent: string, codeSubParent: number[]): Observable<RespondMulti> {
    return this.http.get<RespondMulti>(`${this.apiUrl}/${path}/${codeParent}/${[...codeSubParent]}`);
  }
}
