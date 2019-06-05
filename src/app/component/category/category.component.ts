import {Component, OnDestroy, OnInit, Output, ViewChild, OnChanges} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {PaginationService} from '../../service/pagination.service';
import {Http} from '@angular/http';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ProductsListComponent} from './products-list/products-list.component';
import {environment} from '../../../environments/environment';
import {CategoryHeaderComponent} from './category-header/category-header.component';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit, OnDestroy{




  @Output() viewQuick: string ;
  @ViewChild(ProductsListComponent) productListComponent: ProductsListComponent;
  @ViewChild(CategoryHeaderComponent) cateHeader: CategoryHeaderComponent;
  page: number;
  id: number;
  categoryID: number;
  private sub: any;
  private sub2: any;
  pages: any;
  constructor(private paginationService: PaginationService,
              private http: Http,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private itemService: ItemService) {
    this.viewQuick = 'none';
    this.id = 0;
    this.page = 0;
  }

  ngOnInit() {
      this.sub = this.route.queryParams.subscribe(params => {
      console.log(params['page']);
      this.page = +params['page'];
      if (!this.page) {
        this.page = 1;
      }
      this.getListProducts(this.id, this.categoryID, this.page);

    });

    this.sub2 = this.route.params.subscribe(params2 => {
      this.id = +params2['id'];
      if (!this.id) {
        this.id = 0;
      }
      this.categoryID = +params2['categoryid'];
      alert('category component');
      alert(this.categoryID)
      if(!this.categoryID) {
        this.categoryID = 0;
      }
      this.getListProducts(this.id, this.categoryID, this.page);
      
    });
  }


  // ngOnChanges() {
  //   this.sub = this.route.queryParams.subscribe(params => {
  //     console.log(params['page']);
  //     this.page = +params['page'];
  //     if (!this.page) {
  //       this.page = 1;
  //     }

  //     this.sub2 = this.route.params.subscribe(params2 => {
  //       this.id = +params2['id'];
  //       if (!this.id) {
  //         this.id = 0;
  //       }
  //       this.categoryID = +params['categoryid'];
  //       alert(this.categoryID);

  //       if(!this.categoryID) {
  //         this.categoryID = 0;
  //       }
        
  //     });
  //     this.getListProducts(this.id, this.categoryID, this.page);

  //   });
  // }
  getListProducts (storeId: number, categoryID: number, page: number) {

    this.itemService.getItemByStoreIdAndCategory(storeId,  categoryID, page).subscribe(
      result => {
        if(result['success'] === true) {
          this.productListComponent.items = result['data'];

          console.log(JSON.stringify(this.productListComponent.items));

          let totalPages:number = result['totalPages'];
          console.log( result['totalPages'])

          let pages = {"totalPages": totalPages, "number": page-1};
          this.paginationService.init(pages);
        }
      }
    )

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}
