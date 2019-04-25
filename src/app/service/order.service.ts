import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';

@Injectable()
export class OrderService {
  constructor(private http: Http, private tokenService: TokenService) {
  }
  sendOrder(data) {
    return this.tokenService.postDataWithToken(environment.hostname + '/order/create',
        data);
  }
  getItemByOrder(id) {
    return this.tokenService.getDataWithToken(`${environment.hostname}/api/orders/${id}`);
  }
  deleteOrder(id) {
    return this.tokenService.deleteDataWithToken(`${environment.hostname}/api/orders/${id}`);
  }
  updateOrder(id, data) {
    return this.tokenService.putDataWithToken(`${environment.hostname}/api/orders/${id}`, data);
  }
}
