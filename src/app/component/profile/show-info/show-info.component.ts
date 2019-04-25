import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {TokenService} from '../../../service/token.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-show-info',
    templateUrl: './show-info.component.html',
    styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

    sub: any;
    user: any;

    constructor(private userService: UserService,
                private tokenService: TokenService) {
    }

    ngOnInit() {
        this.sub = this.tokenService.getDataWithToken(environment.hostname + '/user/getUserDetail').subscribe(data => {
            this.user = data;
        });
    }
}
