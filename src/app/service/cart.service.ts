import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import swal from 'sweetalert2';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';

@Injectable()
export class CartService implements OnDestroy {
  public login = new Subject<any>();
  carts: any;
  constructor(private http: Http, private tokenService: TokenService) {
    let carts;
    carts = localStorage.getItem('cart');
    this.carts = carts !== null ? JSON.parse(carts) : [];
    this.updateCart();
  }
  getCarts() {
    localStorage.getItem('carts');
  }
  addItem(product: any, quantity = 1) {
    let existItem: any;
    this.carts.forEach(function (item) {
      if (item.id === product.id) {
        existItem = item;
        item.quantityCart += quantity;
        return false;

      }
    });
    if (existItem === undefined) {
      let cartItem;
      cartItem = Object.assign({}, product);
      cartItem.quantityCart = quantity;
      this.carts.push(cartItem);
    }
    swal('Thông báo', 'Đã thêm ' + product.name + ' vào giỏ hàng!', 'success');
    this.saveCartToLocalStorage();
  }
  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
  getTotal() {
    let total: number;
    total = 0;
    this.carts.forEach(function (item) {

      total += (item.price * item.quantityCart);
    });
    return total;
  }
  removeItem(item) {
    let index;
    index = this.carts.indexOf(item);
    this.carts.splice(index, 1);
    this.saveCartToLocalStorage();
  }
  removeCart() {
    this.carts = [];
    this.saveCartToLocalStorage();
  }
  updateCart() {
    let itemIds, value;
    itemIds = [];
    for (value of this.carts){
      itemIds.push(value.id);
    }
    let headers;
    headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.http.post(environment.hostname + '/item/getCart', itemIds,
        { headers: headers })
        .map(res => res.json())
        .subscribe((data: any) => {
      this.carts.forEach(function (item) {
        item.price = data.find(trai => trai.id === item.id).price;
      });
      this.saveCartToLocalStorage();
    });
  }
  paymentOnline(data) {
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.tokenService.getToken());
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.hostname + '/order/getUrl', data,
        { headers: headers });
  }
 ngOnDestroy() {
    localStorage.setItem('cart', this.carts.toString());
 }
}
