import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShareService} from '../../../service/share.service';
import {CartService} from '../../../service/cart.service';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.css']
})
export class QuickviewComponent implements OnInit {
  param: string;
  product: any;
  quantity: number;
  @Output() closeEvent = new EventEmitter();
  constructor(private service: ShareService, private cartService: CartService) {
    this.param = 'none';
    this.quantity = 1;
  }
  closeViewQuick() {
    this.closeEvent.emit('none');
  }
  ngOnInit() {
  }
  addCart() {
    this.cartService.addItem(this.product, this.quantity);
  }
}
