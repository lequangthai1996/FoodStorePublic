import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {Store} from '../models/store.model'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class StoreService {

  //listStores$: Subject<Store>;

  public listStores = new Subject<any>();
  // listStores: Store[] = [];
  
  constructor(
    private http: HttpClient
  ) { }

  searchStores(body: any, page: number): Observable<any> {
    return this.http.post<Store[]>(environment.hostname + "/guess/stores/list?page=" + page, JSON.stringify(body), httpOptions);
  }
}
