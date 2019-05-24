import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {FormGroup, FormBuilder, Validator, FormControl, Validators} from '@angular/forms';
import {Http} from '@angular/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {CartService} from '../../../service/cart.service';
import {CategoryService} from '../../../service/category.service';
import {StoreService} from '../../../service/store.service';
import { Category } from '../../../models/category.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: []
})
export class HeaderComponent implements OnInit {

    user: TokenService;
    cart: CartService;
    inputSearch: any;
    searchForm: FormGroup;
    listCategories: Category[] = [];


    constructor(private http: Http,
                private tokenService: TokenService,
                private cartService: CartService,
                private categoryService: CategoryService,
                private fb: FormBuilder,
                private storeService: StoreService,
                private router: Router) {
        this.user = this.tokenService;
        this.cart = this.cartService;
        this.getListCatogory();
    }

    ngOnInit() {
        this.searchForm = this.fb.group({
            category_id: [0],
            key_search: ['']
        })

        this.getListCatogory();
    }
    getListCatogory() {
        this.categoryService.getListCategory().subscribe(
            result => {
                console.log(result);
                if(result['success'] === true) {
                    this.listCategories = result['data'];
                    console.log(this.listCategories);
                }else {
                    alert("Can't get list category")
                }
      
            }, error => {
                alert(error);
            }
        );
    }

    onSubmit() {
        this.storeService.searchStores(this.searchForm.value , 1).subscribe(
            result => {
                console.log(result);
                this.storeService.listStores$.next(result);
            }
        )
    }

    login(data) {
        this.tokenService.getInfo();
    }

    logout() {
        this.tokenService.removeToken();
        this.user.currentUser = null;
        this.router.navigate(['/home']);
        swal('Thông báo', 'Đăng xuất thành công!', 'success');
    }

    addCart(data) {
        this.cartService.addItem(data.item, data.quantity);
    }

    getInfo() {
    }

    search(inputSearch: string) {
        if (inputSearch === undefined ) {
            inputSearch = '';
        }
        console.log(inputSearch);
        this.router.navigate(['search', inputSearch]);
    }
}
