import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.css']
})
export class HomeCategoryComponent implements OnInit {
  categories: any;
  constructor(private categorySevice: CategoryService) {
    this.categories = [];
  }

  ngOnInit() {
    this.categorySevice.getListCategory().subscribe((data: any) => {
      this.categories = data;
    });
  }

}
