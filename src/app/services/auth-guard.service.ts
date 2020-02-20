import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  // when we map this and return a boolean Angular internally subscribes and destroys the
  // subscription which is good. canActivate can return boolean, Obsevable<boolean> or Promise<boolean>
  // Here we return Obsevable<boolean>
  canActivate(router, state: RouterStateSnapshot) {
     return this.auth.user$.pipe(
      map(user => {
        if(user) return true;
 
        this.router.navigate(['/login'], { queryParams:{ returnUrl: state.url }});
        return false;
      }
     ));
  }
  
}
