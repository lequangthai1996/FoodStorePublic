import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MainPaymentComponent} from './main-payment/main-payment.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild(MainPaymentComponent) main: MainPaymentComponent;
  constructor() { }

  ngOnInit() {
  }
  submitOrder(items) {
    // console.log(items);
    this.main.order(items);
  }

}
