import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../service/cart.service';
import {TokenService} from '../../../service/token.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {OrderService} from '../../../service/order.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

declare let paypal: any;
@Component({
  selector: 'app-main-payment',
  templateUrl: './main-payment.component.html',
  styleUrls: ['../payment.component.css']
})
export class MainPaymentComponent implements OnInit {
  cart: any;
  currentUser: any;
  ortherShip = false;
  orderForm: FormGroup;
  constructor(private cartService: CartService,
              public tokenService: TokenService,
              private formBuilder: FormBuilder,
              private orderService: OrderService,
              private router: Router) {
    this.orderForm = this.formBuilder.group({
      personal: this.formBuilder.group({
        email: new FormControl( '',
            [Validators.required, Validators.email]),
        name: new FormControl( '',
            [Validators.required]),
        phone: new FormControl('',
            [Validators.required, Validators.pattern('[0-9]*')]),
        address: new FormControl('',
            [Validators.required])
      }),
      shipAddress: this.formBuilder.group({
        name: new FormControl('', []),
        phone: new FormControl('', []),
        address: new FormControl('', []),
      }),
      note: new FormControl('')
    });
    //this.tokenService.getInfo();
  }
  order(items) {
    console.log("haha");
    console.log(items);
    if (!this.orderForm.valid) {
      swal('Thông báo!', 'Dữ liệu chưa hợp lệ! Mời bạn kiểm tra lại', 'error');
      return;
    }
    if (this.tokenService.currentUser === undefined) {
      swal('Thông báo!', 'Mời bạn đăng nhập rồi thực hiện chức năng này!', 'error');
      return;
    }
      let model, data;
      model = this.orderForm.value;
      data = {
        'address': model.shipAddress.address !== '' ? model.shipAddress.address : model.personal.address,
        'name': model.shipAddress.name !== '' ? model.shipAddress.name : model.personal.name,
        'phone': model.shipAddress.phone !== '' ? model.shipAddress.phone : model.personal.phone,
        'note': model.note,
        'userId': this.tokenService.currentUser.id,
        'promotionId': 1,
        'shipId': 1,
        'orderItems': items,
        'supplierId': this.tokenService.getSupplierID()
      };
    console.log("gio hang ne: ");
    console.log(data);
      this.orderService.sendOrder(data).subscribe((a: any) => {
        swal('Thông báo', 'Đặt hàng thành công!', 'success');
        this.cartService.removeCart();
        this.router.navigate(['/home']);
      }, (err: any) => {
        swal('Thông báo!', 'Đặt hàng thất bại!', 'error');
      });
  }
  paymentOnline() {
    let data;
    data = {
      order_id: 1,
      business: 'ngocvudut1995@gmail.com',
      total_amount: this.cartService.getTotal() + 20000,
      shipping_fee: 20000,
      tax_fee: '',
      order_description: 'Thanh toán đơn hàng tại trang web foodmarket.ddns.net',
      url_success: 'http://foodmarket.ddns.net',
      url_cancel: 'http://foodmarket.ddns.net',
      url_detail: 'http://foodmarket.ddns.net'
    };
    this.cartService.paymentOnline(data).subscribe(url => {
      // console.log(url);
      window.location.href = url['_body'];
    });
  }
  renderButtonPaypal() {
    let items, total;
    items  = [];
    this.cartService.carts.forEach(item => {
      items.push({
        quantity: item.quantityCart.toString(),
        name: item.name,
        price: (Math.round(item.price / 20000 * 100) / 100).toLocaleString('usa'),
        currency: 'USD',
        description: '',
        tax: ''
      });
    });
    total = Math.round(this.cartService.getTotal() / 20000 * 100) / 100;
    paypal.Button.render({

      env: 'sandbox', // Or 'sandbox'
      style: {
        label: 'checkout',  // checkout | credit | pay | buynow | generic
        size:  'responsive', // small | medium | large | responsive
        shape: 'pill',   // pill | rect
        color: 'gold'   // gold | blue | silver | black
      },
      client: {
        sandbox: environment.client_id_sandbox,
        production: environment.client_id_sandbox
      },

      commit: true, // Show a 'Pay Now' button
      payment: function(data, actions) {
        return actions.payment.create({
          payment: {
            transactions: [
              {
                amount:
                    {
                      total: (total + 1.00).toLocaleString('usa'),
                      currency: 'USD',
                      details:
                          {
                            subtotal: total.toLocaleString('usa'),
                            shipping: '1.00',
                            tax: '0.00',
                            shipping_discount: '0.00'
                          }
                    },
                item_list:
                    {
                      items: items
                    },
                description: 'The payment transaction description.',
              }
            ]
          }
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then((payment) => {
          // this.cartService.removeCart();
          this.afterPayment(payment);
          // The payment is complete!
          // You can now show a confirmation message to the customer
        });
      },
      onCancel: function(data, actions) {
        // return actions.redirect();
      }

    }, '#paypal-button');
  }
  afterPayment(payment) {
    let items;
    items = [];
    this.cartService.carts.forEach(item => {
      items.push({id : item.id, quantityCart: item.quantityCart});
    });
    let model, data;
    model = this.orderForm.value;
    data = {
      'address': model.shipAddress.address !== '' ? model.shipAddress.address : model.personal.address,
      'name': model.shipAddress.name !== '' ? model.shipAddress.name : model.personal.name,
      'phone': model.shipAddress.phone !== '' ? model.shipAddress.phone : model.personal.phone,
      'note': model.note,
      'userId': this.tokenService.currentUser.id,
      'promotionId': 1,
      'shipId': 1,
      'orderItems': items,
      'supplierId': this.tokenService.getSupplierID()
    };
    console.log(JSON.stringify(data));
    this.orderService.sendOrder(data).subscribe((a: any) => {
      console.log("order detail");
      console.log(a);
      let url, body ;
      url = environment.hostname + '/payments/create';
      body = {
        'order': {
          'id': a.data.id
        },
        'transactionId': payment.id,
        'transactionAmount': payment.transactions[0].amount.total,
        'payEmail': payment.payer.payer_info.email,
        'transactionTime': payment.create_time.substring(0, payment.create_time.length - 1)
      };
      console.log("payment payer");
      console.log(body);
      console.log("orderId" + body.order.id);
      this.cartService.removeCart();
      this.tokenService.postDataWithToken(url, body).subscribe(res => {
        swal('Thông báo', 'Đơn hàng đã đặt và thanh toán thành công!', 'success');
        this.router.navigate(['/history-orders']);
      });
    }, (err: any) => {
      swal('Thông báo!', 'Đặt hàng thất bại!', 'error');
    });
  }
  ngOnInit() {
    setTimeout(a => {
      this.currentUser = this.tokenService.currentUser;
      this.cart = this.cartService;
      this.orderForm = this.formBuilder.group({
        personal: this.formBuilder.group({
          email: new FormControl(this.tokenService.currentUser !== null ? this.tokenService.currentUser.email : '',
              [Validators.required, Validators.email]),
          name: new FormControl(this.tokenService.currentUser !== null ? this.tokenService.currentUser.full_name : '',
              [Validators.required]),
          phone: new FormControl(this.tokenService.currentUser !== null ? this.tokenService.currentUser.phone : '',
              [Validators.required, Validators.pattern('[0-9]*')]),
          address: new FormControl(this.tokenService.currentUser !== null ? this.tokenService.currentUser.address : '',
              [Validators.required])
        }),
        shipAddress: this.formBuilder.group({
          name: new FormControl('', []),
          phone: new FormControl('', []),
          address: new FormControl('', []),
        }),
        note: new FormControl('')
      });
      this.renderButtonPaypal();
    }, 2000);

  }
}
