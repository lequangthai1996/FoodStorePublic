import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class OrderService {

  constructor(private http: Http, private tokenService: TokenService) {
  }
  options = new RequestOptions({
    headers: new Headers({
      'Accept': 'application/json'
    })
  });


  sendOrder(data) {
    return this.tokenService.postDataWithToken(environment.hostname + '/order/createOrder',
        data, this.options);
  }
  getItemByOrder(id) {
    return this.tokenService.getDataWithToken(`${environment.hostname}/api/orders/${id}`);
  }
  deleteOrder(id) {
    return this.tokenService.deleteDataWithToken(`${environment.hostname}/order/${id}`);
  }
  updateOrder(id, data) {
    return this.tokenService.putDataWithToken(`${environment.hostname}/api/orders/${id}`, data);
  }
}
