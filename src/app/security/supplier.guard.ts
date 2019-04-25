import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../service/token.service';

@Injectable()
export class SupplierGuard implements CanActivate {

  private can = false;
  constructor(private tokenService: TokenService,
              private router: Router) {

  }
  canActivate() {
    console.log('SupplierGuard#canActivate called, can: ', this.can);
    if (this.tokenService.isLogged() && this.tokenService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/not-permission']);
    return false;
  }
}
