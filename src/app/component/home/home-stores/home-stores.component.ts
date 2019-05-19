import { Component, OnInit, ViewChild } from '@angular/core';
import {StoresListComponent} from './stores-list/stores-list.component'
import {environment} from '../../../../environments/environment';
import {CategoryService} from '../../../service/category.service';
import {PaginationService} from '../../../service/pagination.service';
import {Http} from '@angular/http';
import {ActivatedRoute, Route, Router} from '@angular/router';
@Component({
  selector: 'app-home-stores',
  templateUrl: './home-stores.component.html',
  styleUrls: ['./home-stores.component.css']
})
export class HomeStoresComponent implements OnInit {

  @ViewChild(StoresListComponent) storesListComponent: StoresListComponent;
  page: number =1 ;
  id: number =1;
  sort: string;
  private sub: any;
  private sub2: any;
  constructor(
    private paginationService: PaginationService,
              private http: Http,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getList(this.id, this.page);
  }
  getList (id, page) {
    if (id === 0) {
      this.http.get(environment.hostname + '/item/all?page=' + (this.page - 1)
          + '&size=12').map(res => res.json()).subscribe((data: any) => {
        console.log(data);
        this.storesListComponent.items = data.content;
        this.paginationService.init(data);
      }, (err: any) => {

      });
    } else {
      this.http.get(environment.hostname + '/category/items/' + this.id +
          '?page=' + (this.page - 1) + '&size=12&sort=' + this.sort).map(res => res.json()).subscribe((data: any) => {
        console.log(data);
        this.storesListComponent.items = data.content;
        this.paginationService.init(data);
      }, (err: any) => {

      });
    }
  }
}
