import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase";
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    // signInWithRedirect returns a promise so you can use then
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    // Warning: If you use switchMap with an Async pipe in the html the browser will crash
    // going into infinite loop! as async pipe marks that template for change detection.
    return this.user$
      .pipe(
        switchMap(user => {
          if(user) return this.userService.get(user.uid).valueChanges();

          return of(null);
        })
      );
  }

}
