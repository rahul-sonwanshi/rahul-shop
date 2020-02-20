import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(router, state: RouterStateSnapshot) {
    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin));
  }

}
