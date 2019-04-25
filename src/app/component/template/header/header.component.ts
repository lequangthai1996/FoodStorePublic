import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {Http} from '@angular/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {CartService} from '../../../service/cart.service';
import {FormBuilder, FormControl} from '@angular/forms';

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
    searchForm: any;

    constructor(private http: Http,
                private tokenService: TokenService,
                private cartService: CartService,
                private _fb: FormBuilder,
                private router: Router) {
        this.user = this.tokenService;
        this.cart = this.cartService;
    }

    ngOnInit() {
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
