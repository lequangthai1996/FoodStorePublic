import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {PaginationService} from '../../../service/pagination.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {isUndefined} from 'util';
import {ShareService} from '../../../service/share.service';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.css']
})
export class CategoryBlockComponent implements OnInit {
  categories: any;
  categoryActive: any;
  subCategoryCurrent: any;
  toggle: true;
  storeID: number;
  categoryID: number;
  private sub: any;
  constructor(private categorySevice: CategoryService,
              private paginationService: PaginationService,
              private route: ActivatedRoute,
              private titleService: Title,
              private router: Router,
              private shareService: ShareService) {
    this.categories = [];
    this.subCategoryCurrent = [];
    this.categoryActive = null;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params2 => {
      this.storeID = +params2['id'];
      this.categoryID = +params2['categoryid'];
      if (!this.categoryID || this.categoryID===0) {
        this.categoryID = 0;
        this.titleService.setTitle('Tất cả sản phẩm');
      }
    });
    this.categorySevice.getListCategoryOfSpecifyStore(this.storeID).subscribe((result: any) => {
      this.categories = result['data'];

      this.route.data.subscribe((v: any) => {
        this.categoryActive = this.categories.find((obj) => obj.id === this.categoryID);
        if (this.categoryActive === undefined) {
          this.categorySevice.getDetail(this.categoryID).subscribe((c: any) => {
            this.categoryActive = c;
            this.titleService.setTitle(this.categoryActive.name);
            v.breadcrumb = this.categoryActive.name;
            this.shareService.updateBreadCrum(v.breadcrumb);
          });
        } else {
          v.breadcrumb = this.categoryActive.name;
          this.titleService.setTitle(this.categoryActive.name);
          this.shareService.updateBreadCrum(v.breadcrumb);
        }
      });
    });
  }
  
  toggleMenu(id) {
    if (this.subCategoryCurrent.length !== 0) {
      this.subCategoryCurrent = [];
      return;
    }
    this.loadSubCategory(id);
  }
  loadSubCategory(id) {
    this.categorySevice.getListSubCategory(id).subscribe((data: any) => {
      this.subCategoryCurrent = data;
    });
  }
}
