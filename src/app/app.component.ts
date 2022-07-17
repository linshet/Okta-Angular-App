// Import modules
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Okta-Angular-App';
  public isAuthenticated$!: Observable<boolean>;

  constructor(
    private _router: Router,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ) {}

  // Subscribe to OktaAuthState to see if user is authenticated
  public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  // Sign In Method
  public async signIn(): Promise<void> {
    await this._oktaAuth.signInWithRedirect();
    // If you want the callback route always redirects user to a specific page after sign-in,
    // use the following line instead.
    // await this._oktaAuth.signInWithRedirect().then(_ => this._router.navigate(['/profile']));
  }

  // Sign Out Method
  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
}
