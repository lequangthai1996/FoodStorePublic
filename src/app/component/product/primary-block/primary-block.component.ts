import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../../service/item.service';
import {FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent, InitParams} from 'ngx-facebook';
import {ShareService} from '../../../service/share.service';
import {environment} from '../../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-primary-block',
  templateUrl: './primary-block.component.html',
  styleUrls: ['./primary-block.component.css']
})
export class PrimaryBlockComponent implements OnInit, OnDestroy {

    id: number;
    image: any;
    private sub: any;
    item: any;
    images_item: any;
    constructor(private route: ActivatedRoute,
                private itemService: ItemService,
                private fb: FacebookService,
                private shareService: ShareService,
                private titleService: Title) {
        this.image = null;
        this.item = null;
        this.images_item = [];
      const initParams: InitParams = {
        appId      : '129604284344795',
        xfbml      : true,
        version    : 'v2.10'
      };

      fb.init(initParams);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.itemService.getItemById(this.id).subscribe((data: any) => {
                this.item = data;
                this.image = './assets/images/upload/' + this.item.avatar;
                this.route.data.subscribe((v: any) => {
                  v.breadcrumb = this.item.name;
                  this.titleService.setTitle(this.item.name);
                  this.shareService.updateBreadCrum(v.breadcrumb);
                });
            });
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
  share() {

    let params: UIParams = {
      href: 'http://foodmarket.ddns.net/',
      method: 'share'
    };

    this.fb.ui(params)
        .then((res: UIResponse) => console.log(res))
        .catch((e: any) => console.error(e));

  }
  addCart() {
    this.shareService.addCart(this.item);
  }
  private handleError(error) {
    console.error('Error processing action', error);
  }
}
