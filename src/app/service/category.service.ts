import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class CategoryService {
  constructor(private http: Http) {
  }
  getListCategory() {
    return this.http.get(environment.hostname + '/category/level/1').map(res => res.json());
  }
  getListSubCategory(id: number) {
    return this.http.get(environment.hostname + '/category/parents/' + id).map(res => res.json());
  }
  getDetail(id: number) {
    return this.http.get(environment.hostname + '/category/' + id).map(res => res.json());
  }
}
