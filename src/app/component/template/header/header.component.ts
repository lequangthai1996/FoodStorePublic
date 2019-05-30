import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {FormGroup, FormBuilder, Validator, FormControl, Validators} from '@angular/forms';
import {Http} from '@angular/http';
import swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {CartService} from '../../../service/cart.service';
import {CategoryService} from '../../../service/category.service';
import {StoreService} from '../../../service/store.service';
import { Category } from '../../../models/category.model';
import { PaginationService } from '../../../service/pagination.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: []
})
export class HeaderComponent implements OnInit {

    user: TokenService;
    cart: CartService;
    cartId: number;
    inputSearch: any;
    searchForm: FormGroup;
    listCategories: Category[] = [];
    page: number;


    constructor(private http: Http,
                private tokenService: TokenService,
                private cartService: CartService,
                private categoryService: CategoryService,
                private fb: FormBuilder,
                private storeService: StoreService,
                private route: ActivatedRoute,
                private paginationService: PaginationService,
                private router: Router) {
        this.user = this.tokenService;
        this.cart = this.cartService;
        this.getListCatogory();
    }

    ngOnInit() {

        this.route.queryParams.subscribe(params => {
            this.page = +params['page'];
            if(!this.page) {
                this.page = 1;
            }
        })
        this.searchForm = this.fb.group({
            categories: [0],
            key_search: ['']
        })

        this.getListCatogory();

        this.cartService.cartID.subscribe( cartID => {
            this.cartId = cartID;
        })
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
        console.log("form search");
        console.log(this.searchForm.value);
        this.storeService.searchStores(this.searchForm.value , this.page).subscribe(
            result => {
                if(result['success']===true) {
                    this.storeService.listStores.next(result['data']);

                    let totalPages:number = result['totalPages'];
                    let pages = {"totalPages": totalPages, "number": this.page-1}
                    this.paginationService.init(pages);
                }
            }
        )
    }

    login(data) {
        this.user.currentUser = data;
        alert("cmnr")
        //this.tokenService.getInfo();
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
