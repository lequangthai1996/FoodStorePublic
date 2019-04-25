import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-home-sale',
  templateUrl: './home-sale.component.html',
  styleUrls: ['./home-sale.component.css']
})
export class HomeSaleComponent implements OnInit {

itemsPromotion: any;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItemPromotion().subscribe((data: any) => {
      this.itemsPromotion = data;
    });
  }

}
