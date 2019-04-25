import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {TokenService} from '../service/token.service';
import swal from 'sweetalert2';
import {ShareService} from '../service/share.service';

@Injectable()
export class ActivateGuard implements CanActivate {

  private can = false;
  constructor(private tokenService: TokenService,
              private shareService: ShareService,
              private router: Router) {

  }
  canActivate() {
    console.log('ActivateGuard#canActivate called, can: ', this.can);
    if (this.tokenService.isLogged()) {
      return true;
    }
    swal('Thông báo', 'Mời bạn đăng nhập để thực hiện chức năng này', 'error');
    this.router.navigate(['/login']);
    return false;
  }
}
