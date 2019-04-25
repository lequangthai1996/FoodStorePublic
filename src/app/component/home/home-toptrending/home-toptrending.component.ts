import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../service/item.service';

@Component({
  selector: 'app-home-toptrending',
  templateUrl: './home-toptrending.component.html',
  styleUrls: ['./home-toptrending.component.css']
})
export class HomeToptrendingComponent implements OnInit {

  itemsPromotion: any;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItemTrending().subscribe((data: any) => {
      this.itemsPromotion = data;
    });
  }

}
