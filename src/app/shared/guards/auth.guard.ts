import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from "../services/local-storage.service";
import {AppRoutes} from "../constants/app-routest";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private route: Router,
    private storage: LocalStorageService
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.storage.getValue('isLoggedIn')) {
      return true;
    } else {
      this.route.navigate([`/${AppRoutes.LOGIN}`]);
      return false;
    }

  }

}
