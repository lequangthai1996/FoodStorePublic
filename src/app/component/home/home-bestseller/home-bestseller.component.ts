import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../service/item.service';
import {ShareService} from '../../../service/share.service';

@Component({
  selector: 'app-home-bestseller',
  templateUrl: './home-bestseller.component.html',
  styleUrls: ['./home-bestseller.component.css']
})
export class HomeBestsellerComponent implements OnInit {

    itemsBest: any;
    constructor(private itemService: ItemService,
                private service: ShareService) { }

    ngOnInit() {
        this.itemService.getItemBest().subscribe((data: any) => {
            this.itemsBest = data;
        });
    }
  addCart(product) {
    this.service.addCart(product);
  }
  openViewQuick(product) {
    this.service.openQuickView(product);
  }
}
