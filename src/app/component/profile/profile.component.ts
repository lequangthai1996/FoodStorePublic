import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {TokenService} from '../../service/token.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

    auth_token: any;
    avatar: any;
    sub: any;

    constructor(private router: Router,
                private userService: UserService,
                private tokenService: TokenService) {
    }

    ngOnInit() {
        if (!this.tokenService.isLogged()) {
            alert('You have to login!');
            this.router.navigate(['login']);
        } else {
            alert("Profile ");
            this.sub = this.tokenService.getDataWithToken(environment.hostname + '/user/getUserDetail').subscribe(data => {
                this.avatar = data.avatar;
            });
            this.userService.avatar.subscribe(data => {
                this.avatar = data.avatar;
            });
        }
    }

    editProfile() {
        this.router.navigate(['profile/edit']);
    }

    showHistoryOrder() {
        this.router.navigate(['history-orders']);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
