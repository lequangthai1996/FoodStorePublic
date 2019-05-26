import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../service/item.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-more-info-block',
  templateUrl: './more-info-block.component.html',
  styleUrls: ['./more-info-block.component.css']
})
export class MoreInfoBlockComponent implements OnInit {

    id: number;
    sub: any;
    name: string;
    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.itemService.getItemById(this.id).subscribe((data: any) => {
                this.name = data.name;
            });
        });
    }
    constructor(private route: ActivatedRoute, private itemService: ItemService) {
    }

}
