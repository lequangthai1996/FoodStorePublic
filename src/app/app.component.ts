import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from './component/template/header/header.component';
import {ShareService} from './service/share.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {TokenService} from './service/token.service';
import {BreadcrumbsComponent} from './component/template/breadcrumbs/breadcrumbs.component';
import {QuickviewComponent} from './component/category/quickview/quickview.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShareService, TokenService]
})
export class AppComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  @ViewChild(BreadcrumbsComponent) breadcrumbComponent: BreadcrumbsComponent;
  @ViewChild(QuickviewComponent) quickviewComponent: QuickviewComponent;
  title = 'app';
  constructor(private router: Router,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
              private serviceShare: ShareService,
              private _router: Router) {
  }
  ngOnInit() {
    this._router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.serviceShare.login.subscribe(data => {
      this.header.login(data);
    });
    this.serviceShare.cart.subscribe(data => {
      this.header.addCart(data);
    });
    this.serviceShare.breadCrumb.subscribe(data => {
      this.breadcrumbComponent.breadcrumbs[1].label = data;
    });
    this.serviceShare.viewQuick.subscribe(data => {
      console.log(data);
      this.quickviewComponent.param = 'block';
      this.quickviewComponent.product = data;
    });
    this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
        .subscribe((event) => {
          if (event.hasOwnProperty('title')) {
            this.titleService.setTitle(event['title']);
          }
        });
  }
  closeViewQuick(event) {
    this.quickviewComponent.param = event;
  }
}
