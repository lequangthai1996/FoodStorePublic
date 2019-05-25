import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/category.service';
import {ShareService} from '../../../../service/share.service';
import { TokenService } from '../../../../service/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-block',
  templateUrl: './product-block.component.html',
  styleUrls: ['./product-block.component.css']
})
export class ProductBlockComponent implements OnInit {
  @Input() product: any;
  @Input() index: any;
  @Input() size: any;
  @Input() class: any;
  supplierID: any;
  constructor(private service: ShareService, private tokenService: TokenService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.supplierID = +params['id'];
    });
  }
  addCart() {
    this.service.addCart(this.product);
    if(this.tokenService.getSupplierID == null && this.supplierID != null) {
      this.tokenService.setSupplierID = this.supplierID;
    }
  }
  openViewQuick() {
    this.service.openQuickView(this.product);
  }
}
