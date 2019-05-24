import { Component, OnInit, ViewChild } from '@angular/core';
import {StoresListComponent} from './stores-list/stores-list.component'
import {environment} from '../../../../environments/environment';
import {CategoryService} from '../../../service/category.service';
import {PaginationService} from '../../../service/pagination.service';
import {Http} from '@angular/http';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { StoreService } from '../../../service/store.service';
@Component({
  selector: 'app-home-stores',
  templateUrl: './home-stores.component.html',
  styleUrls: ['./home-stores.component.css']
})
export class HomeStoresComponent implements OnInit {

  @ViewChild(StoresListComponent) storesListComponent: StoresListComponent;
  page: number;
  private sub: any;
  private sub2: any;
  constructor(
    private paginationService: PaginationService,
              private http: Http,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private storeService: StoreService
  ) {
    this.page = 0;
   }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.page = +params['page'];
      if (!this.page) {
        this.page = 1;
      }
      this.getList(this.page);
    });

    // this.storeService.listStores$.subscribe(v => {
    //   console.log(v);
    // });
  }
  getList (page: number) {
    var formSearch = {
      "categories": [],
      "key_search": ""
    }
    this.storeService.searchStores(formSearch, page).subscribe(
      result => {
        if(result['success'] === true) {
          this.storesListComponent.items = result['data'];
          console.log("xxxx\n" + JSON.stringify(result));
          let totalPages:number = result['totalPages'];
          console.log( result['totalPages'])

          let pages = {"totalPages": totalPages, "number": page-1};
          this.paginationService.init(pages);
        }
      }
    )
  }
}
