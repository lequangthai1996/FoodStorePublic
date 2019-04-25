import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {ItemService} from '../../../service/item.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-order-detail',
  templateUrl: './orderDetail.component.html',
  providers: []
})
export class OrderDetailComponent {
  listItem: any;
  id: number;
  constructor(private _location: Location,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) {
    this.listItem = [];
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.router.navigate(['/home']);
      }
    });
    this.itemService.getItemByOrder(this.id).subscribe(data => {
       this.listItem = data;
       console.log(data);
    });
  }
  changeQuantity(val, index) {
    this.listItem[index].quantityCart = val;
  }
  removeItem(item) {
    let index;
    index = this.listItem.indexOf(item);
    this.listItem.splice(index, 1);
  }
  back() {
    this._location.back();
  }
  updateOrder() {
  }
  getTotal() {
    let total: number;
    total = 0;
    this.listItem.forEach(function (item) {
      total += (item.priceOffical * item.quantityCart);
    });
    return total;
  }
}
