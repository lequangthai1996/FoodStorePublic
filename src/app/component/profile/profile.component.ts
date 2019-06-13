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
            this.router.navigate(['login']);
        } else {
            this.sub = this.tokenService.getDataWithToken(environment.hostname + '/user/getDetail').subscribe(result => {
                if(result['success']=== true) {
                this.avatar = result.data.avatar;
                this.userService.avatar.subscribe(avatar2 => {
                    this.avatar = avatar2;
                });    
                } else {
                    alert(result['message']);
                }
            },
            error => {
                alert(error);
            }
            );
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
