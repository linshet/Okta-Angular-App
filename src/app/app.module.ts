import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 1. Import Okta Modules
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ProfileComponent } from './profile/profile.component';

// 2. Configure OktaAuth: Replace Okta domain and client ID.
const oktaAuth = new OktaAuth({
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  clientId: '${yourClientID}',
  redirectUri: 'login/callback',
});

@NgModule({
  declarations: [AppComponent, ProfileComponent],
  // 3. Add OktaAuthModule to imports array
  imports: [BrowserModule, AppRoutingModule, OktaAuthModule],
  // 4. Add OKTA_CONFIG to providers array
  providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent],
})
export class AppModule {}
