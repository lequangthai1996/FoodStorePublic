import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  providers: [CategoryService]
})
export class ProductsListComponent implements OnInit {
  items: Array<any> = [];
  constructor(private service: CategoryService) {
    // this.service.getList().subscribe((data: any) => {
    //   this.items = data.items;
    // }, (err: any) => {
    //   console.log('errors');
    // });
  }


  ngOnInit() {
  }

}
