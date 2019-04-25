import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchBlockComponent} from "./search-block/search-block.component";
import {ProductListSearchComponent} from "./product-list-search/product-list-search.component";
import {PaginationService} from "../../service/pagination.service";
import {environment} from '../../../environments/environment';
import {Http} from "@angular/http";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  key: string;
  page: number;
  sub: any;

  @ViewChild(SearchBlockComponent) searchBlock: SearchBlockComponent;
  @ViewChild(ProductListSearchComponent) productListSearch: ProductListSearchComponent;
  constructor(private route: ActivatedRoute,
              private pagination: PaginationService,
              private http: Http,
              private router: Router) { }

  ngOnInit() {
      this.sub = this.route.queryParams.subscribe(querParams => {
          this.page = querParams['page'] || 1;
          this.getListResult(this.key, this.page);
      });
      this.sub = this.route.params.subscribe(params => {
         this.key = params['id'] || '';

          console.log(params['id']);
          this.getListResult(this.key, this.page);
      });
  }

  getListResult(key: string, page: number) {
      if (this.key === '') {
          this.http.get(environment.hostname + '/item/all?page=' + (this.page - 1)
              + '&size=3&sort=-id').map(res => res.json()).subscribe((data: any) => {
              this.productListSearch.listResult = data.content;
              this.pagination.init(data);
          }, (err: any) => {
          });
      }else {
          this.http.get(environment.hostname + '/item/search?key=' + this.key + '&page=' + (this.page - 1) + '&size=12')
              .map(res => res.json()).subscribe((data: any) => {
              console.log(data);
              this.productListSearch.listResult = data.content;
              this.pagination.init(data);
          }, (err: any) => {
          });
      }
  }
}
