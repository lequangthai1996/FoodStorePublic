import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../service/cart.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-button-cart',
  templateUrl: './button-cart.component.html',
  styleUrls: ['./button-cart.component.css']
})
export class ButtonCartComponent implements OnInit {
  total: number;
  cart: any;
  constructor(private cartService: CartService, private _location: Location) {
    this.cart = this.cartService;
  }
  ngOnInit() {
  }
  confirmOrder() {
    this.cartService.removeCart();
  }
  updateCart() {
    this.cartService.updateCart();
  }
  back() {
    this._location.back();
  }
}
