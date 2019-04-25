import { Component, OnInit } from '@angular/core';
import {PaginationService} from '../../../service/pagination.service';
import {ActivatedRoute, PRIMARY_OUTLET} from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pagination: PaginationService;
  id: number;
  urlBase: string;
  private sub: any;
  constructor(private paginationService: PaginationService,
              private route: ActivatedRoute) {
    this.pagination = this.paginationService;

  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      let root: ActivatedRoute = this.route.root;
      this.urlBase = this.getUrl(root);
    });
    let root: ActivatedRoute = this.route.root;
    this.urlBase = this.getUrl(root);
  }
  private getUrl(route: ActivatedRoute, url: string = '') {
    // get the child routes
    let children: ActivatedRoute[] = route.children;
    // return if there are no more children
    if (children.length === 0) {
      return url;
    }
    // iterate over each children
    for (let child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      // get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      // append route URL to URL
      url += `/${routeURL}`;
      // recursive
      return this.getUrl(child, url);
    }
  }

}
