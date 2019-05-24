import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import { CartService } from '../../../service/cart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  providers: [CategoryService]
})
export class ProductsListComponent implements OnInit {
  items: Array<any> = [];
  storeID: number;
  private sub: any;
  constructor(
    private service: CategoryService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
    ) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.storeID = +params['id'];
      this.cartService.setCartId(this.storeID);
   });
  }

}
