import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../service/store.service';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit {
  items: Array<any> = [];
  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.storeService.listStores.subscribe(result => {
      this.items = result;
    })
  }

}
