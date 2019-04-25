import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../../service/item.service';

@Component({
    selector: 'app-search-block',
    templateUrl: './search-block.component.html',
    styleUrls: ['./search-block.component.css']
})
export class SearchBlockComponent implements OnInit {

    inputSearch: any;
    searchForm: any;
    listResult: Array<any> = [];
    page: number;
    sub: any;
    @Output() searchEmit: EventEmitter<any> = new EventEmitter<any>();

    constructor(private itemService: ItemService,
                private _fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute) {
    }
    ngOnInit() {
    }
    search(key: string) {
      this.router.navigate(['search', key]);
    }
}
