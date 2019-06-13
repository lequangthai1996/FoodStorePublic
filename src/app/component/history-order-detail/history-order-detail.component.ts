import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import {OrderService} from '../../service/order.service';
import {environment} from '../../../environments/environment';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-history-order-detail',
  templateUrl: './history-order-detail.component.html',
  styleUrls: ['./history-order-detail.component.css']
})
export class HistoryOrderDetailComponent implements OnInit {

  id: number;
  order: any;
  transAt: any;
  notify: any;
  constructor(private _location: Location,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router, private tokenService: TokenService) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.router.navigate(['/home']);
      }
    });
    this.order = [];
    this.tokenService.getDataWithToken(environment.hostname + '/order/user/' + this.id).subscribe( result => {
      this.order = result.data;
    });
    // this.orderService.getItemByOrder(this.id).subscribe(data => {
    //   console.log(data);
    //   if (data.data.length !== 0) {
    //     this.order = data.data;
    //   }
    // });
  }
  changeQuantity(val, index) {
    this.order[index].quantityCart = val;
  }
  // removeItem(item) {
  //   this.translate.get('confirm_delete').subscribe((res: any) => {
  //     this.notify = res;
  //   });
  //   swal({
  //     title: `${this.notify.title}?`,
  //     text: `${this.notify.message}!`,
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: `${this.notify.text_confirm}!`,
  //     cancelButtonText: `${this.notify.text_cancel}!`,
  //   }).then(() => {
  //     this.orderService.deleteOrderItem(item.id).subscribe(res => {
  //       let index;
  //       index = this.order.order_items.indexOf(item);
  //       this.order.order_items.splice(index, 1);
  //       this.translate.get('delete_success').subscribe((info: any) => {
  //         this.notify = info;
  //       });
  //       swal(
  //           `${this.notify.title}!`,
  //           `${this.notify.message}.`,
  //           'success'
  //       );
  //     }, err => {
  //       this.notify = this.translate.instant('error_delete');
  //       swal(
  //           `${this.notify.title}!`,
  //           `${this.notify.message}.`,
  //           'error'
  //       );
  //     });
  //   }).catch(swal.noop);
  // }
  back() {
    this._location.back();
  }
  updateOrder() {
    swal({
      title: `Bạn có chắc chắn?`,
      text: `Muốn chỉnh sửa đơn hàng này!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Đồng ý!`,
      cancelButtonText: `Hủy!`,
    }).then(() => {
      let data;
      let items;
      items = [];
      this.order.order_items.forEach(item => {
        items.push({id: item.itemtable.id, quantity: item.quantity});
      });
      data = {
        'address_ship': this.order.address,
        'items': items
      };
      this.orderService.updateOrder(this.id, data).subscribe(res => {
        swal(
            `Thông báo!`,
            `Chỉnh sửa đơn hàng thành công.`,
            'success'
        );
      }, err => {
        swal(
            `Thông báo!`,
            `Chỉnh sửa đơn hàng thất bại.`,
            'error'
        );
      });
    }).catch(swal.noop);
  }
  removeOrder() {
    swal({
      title: `Bạn có chắc chắn?`,
      text: `Muốn xóa đơn hàng này!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Đồng ý`,
      cancelButtonText: `Hủy`,
    }).then(() => {
      this.orderService.deleteOrder(this.id).subscribe(res => {
        swal(
            `Thông báo!`,
            `Xóa đơn hàng thành công.`,
            'success'
        );
        this.router.navigate(['/history-orders']);
      }, err => {
        swal(
            `Thông báo!`,
            `Xóa đơn hàng thất bại.`,
            'error'
        );
      });
    }).catch(swal.noop);
  }
  getTotal() {
    let total: number;
    total = 0;
    if (this.order.orderItems.length !== 0) {
      this.order.orderItems.forEach(function (item) {
        total += (item.priceOffical * item.quantityCart);
      });
    }
    return total;
  }
  ngOnInit() {}
}
