import {Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {PaginationService} from '../../service/pagination.service';
import {Http} from '@angular/http';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ProductsListComponent} from './products-list/products-list.component';
import {environment} from '../../../environments/environment';
import {CategoryHeaderComponent} from './category-header/category-header.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit, OnDestroy {
  @Output() viewQuick: string ;
  @ViewChild(ProductsListComponent) productListComponent: ProductsListComponent;
  @ViewChild(CategoryHeaderComponent) cateHeader: CategoryHeaderComponent;
  page: number;
  id: number;
  sort: string;
  private sub: any;
  private sub2: any;
  constructor(private paginationService: PaginationService,
              private http: Http,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
    this.viewQuick = 'none';
    this.id = 0;
    this.page = 0;
    this.sort = '';
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      console.log(params['page']);
      this.page = +params['page'];
      if (!this.page) {
        this.page = 1;
      }
      this.sort = params['sort'];
      if (!this.sort) {
        this.sort = '';
      }
      this.sub2 = this.route.params.subscribe(params2 => {
        this.id = +params2['id'];
        if (!this.id) {
          this.id = 0;
        }
        this.getList(this.id, this.page);
      });
    });
  }
  getList (id, page) {
    if (id === 0) {
      this.http.get(environment.hostname + '/item/all?page=' + (this.page - 1)
          + '&size=12').map(res => res.json()).subscribe((data: any) => {
        console.log(data);
        this.productListComponent.items = data.content;
        this.paginationService.init(data);
      }, (err: any) => {

      });
    } else {
      this.http.get(environment.hostname + '/category/items/' + this.id +
          '?page=' + (this.page - 1) + '&size=12&sort=' + this.sort).map(res => res.json()).subscribe((data: any) => {
        console.log(data);
        this.productListComponent.items = data.content;
        this.paginationService.init(data);
      }, (err: any) => {

      });
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  openViewQuick() {
    this.viewQuick = 'block';
  }
  closeViewQuick() {
    this.viewQuick = 'done';
  }
}
