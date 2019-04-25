import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../../service/item.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-product-list-related',
    templateUrl: './product-list-related.component.html',
    styleUrls: ['./product-list-related.component.css']
})
export class ProductListRelatedComponent implements OnInit {

    itemsRelated: any;
    id: number;
    sub: any;

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.itemService.getCateByItem(this.id).subscribe((data: any) => {
                this.itemService.getItemRelated(data[0].id).subscribe((items: any) => {
                    this.itemsRelated = items.content;
                });
            });
        });
    }

    constructor(private route: ActivatedRoute, private itemService: ItemService) {
    }
}
