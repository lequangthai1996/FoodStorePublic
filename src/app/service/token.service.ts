import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http, RequestOptions, Headers} from '@angular/http';
import { environment } from '../../environments/environment';
import {ShareService} from './share.service';
import swal from 'sweetalert2';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class TokenService {
  static TOKEN_KEY = 'AccessToken';
  static TOKEN_EXPIRES = 'Expires';
  static SUPPLIER_ID = "Supplier_id";
  currentUser: any;
  headers: any;
  public login = new Subject<any>();
  constructor(private http: Http,
              private shareService: ShareService) {
    this.headers = new Headers();
    this.headers.append('Authorization', this.getToken() == null ?null : this.getToken());
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-type', 'application/json');
  }

  /** Get information basic of user */
  getInfo() {
    if (this.getToken() == null) {
      this.currentUser = null;
      return;
    }
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.getToken());
    let options;
    options = new RequestOptions({
      headers: headers
    });
    alert("token service");
    this.http.get(environment.hostname + '/user/getUserDetail', options).map(res => res.json()).subscribe((data: any) => {
     this.currentUser = data;
     console.log(data);
    }, (err: any) => {
      if (err.status === 401) {
        this.refreshToken().subscribe((data: any) => {
          this.setToken(data);
          this.getInfo();
          this.shareService.loginToken(this.currentUser);
        }, (err2: any) => {
          if (err2.status === 401) {
            swal('Thông báo', 'Mời bạn đăng nhập lại!', 'error');
            this.removeToken();
            this.shareService.loginToken(null);
          }
        });
      }
    });
  }
  getDataWithToken(url) {
    console.log(this.headers);
    return this.http.get(url, {
      headers: this.headers
    }).map(res => res.json());
  }
  postDataWithToken(url, data, options?) {

    return this.http.post(url, data, options).map(res => res.json());
  }
  putDataWithToken(url, data) {
    return this.http.put(url, data, {
      headers: this.headers
    }).map(res => res.json());
  }
  deleteDataWithToken(url) {
    return this.http.delete(url, {
      headers: this.headers
    }).map(res => res.json());
  }
  getRole() {
    const url = environment.hostname + '/role';
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.getToken());
    let options;
    options = new RequestOptions({
      headers: headers
    });
    console.log(options);
    return this.http.get(url, options).map(res => res.json());
  }
  isAdmin() {
    this.getRole().subscribe((data: any) => {
      for (const authority of data) {
        if (authority  === 'ROLE_ADMIN') {
          return true;
        }
      }
      return false;
    }, (err: any) => {
      if (err.status === 401) {
        this.refreshToken().subscribe((data: any) => {
          this.setToken(data);
          this.isAdmin();
        });
      }
    });
  }
  isLogged() {
    if (this.getToken() != null) {
      return true;
    }
    return false;
  }
  getToken() {
    return Cookie.get(TokenService.TOKEN_KEY);
  }
  refreshToken() {
  console.log('Refresh');
    const url = environment.hostname + '/refresh';
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.getToken());
    return this.http.get(url, {
      headers: headers
    }).map(res => res.json());
  }
  setToken(token) {
    Cookie.set(TokenService.TOKEN_KEY, token /*, token.expire / 3600*/);
  }

  setSupplierID(Supplier_id) {
    Cookie.set(TokenService.SUPPLIER_ID, Supplier_id);
  }

  getSupplierID() {
    return Cookie.get(TokenService.SUPPLIER_ID);
  }
  updateSupplierID(Supplier_id) {
    Cookie.delete(TokenService.SUPPLIER_ID);
  }
  removeToken() {
    Cookie.delete(TokenService.TOKEN_KEY);
  }
}
