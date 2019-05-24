import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class ItemService {

    constructor(private http: Http) {
    }


    getItemByStoreIdAndCategory(storeId: number, categoryId: number, page: number){
        return this.http.get(environment.hostname + '/guess/stores/' + storeId + '/items?category=' + categoryId + '&page='+ page).map(res => res.json());
    }

    getItemByOrder(id) {
        return this.http.get(environment.hostname + '/orderItem/getItemByOrder/' + id).map(res => res.json());
    }
    getItemTool() {
        return this.http.get(environment.hostname + '/item/getItemTool?quantity=9').map(res => res.json());
    }

    getItemPromotion() {
        return this.http.get(environment.hostname + '/item/getItemPromotion?quantity=5').map(res => res.json());
    }
    getItemTrending() {
        return this.http.get(environment.hostname + '/item/getItemTrending?quantity=5').map(res => res.json());
    }

    getItemNew() {
        return this.http.get(environment.hostname + '/item/getItemNew?quantity=9').map(res => res.json());
    }

    getItemBest() {
        return this.http.get(environment.hostname + '/item/getItemBest').map(res => res.json());
    }

    getItemById(id: number) {
        return this.http.get(environment.hostname + '/item/getItemById/' + id).map(res => res.json());
    }

    getItemRelated(id: number) {
        return this.http.get(environment.hostname + '/category/items/' + id + '?page=0&size=4').map(res => res.json());
    }

    getImageOfItem(id: number) {
        return this.http.get(environment.hostname + '/images/item/' + id).map(res => res.json());
    }

    getCateByItem(id: number) {
        return this.http.get(environment.hostname + '/item/getCategory/' + id).map(res => res.json());
    }

    search(key: string, page: number, size: number) {
        return this.http.get(environment.hostname + '/item/search?key=' + key + '&page=' + page + '&size=' + size)
            .map(res => res.json());
    }
}
