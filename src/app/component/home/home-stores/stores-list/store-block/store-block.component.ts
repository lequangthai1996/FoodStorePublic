import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-store-block',
  templateUrl: './store-block.component.html',
  styleUrls: ['./store-block.component.css']
})
export class StoreBlockComponent implements OnInit {
  @Input() product: any;
  @Input() index: any;
  @Input() size: any;
  @Input() class: any;

  constructor() { }
  ngOnInit() {
  }


}
