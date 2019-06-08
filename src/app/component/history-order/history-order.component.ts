import { Component, OnInit, OnDestroy } from '@angular/core';
import {TokenService} from '../../service/token.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {PaginationService} from '../../service/pagination.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.css']
})
export class HistoryOrderComponent implements OnInit, OnDestroy {

  sub: any;
  listOrders: Array<any>;
  public activePage = 1;
  constructor(private tokenService: TokenService,
              private pagination: PaginationService,
              private router: Router) {
    this.listOrders = [];
  }

  ngOnInit() {
      this.sub = this.tokenService.getDataWithToken(environment.hostname + '/order/user').subscribe(result => {
        if(result['success'] === true) {
          this.listOrders = result.data;
          this.pagination.init(this.listOrders);
        } else {
          alert("Has error");
        }
      }, 
      error => {
        alert(error);
      });
  }

    detailOrder(order_id: number) {
        this.router.navigate(['order-detail', order_id]);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
