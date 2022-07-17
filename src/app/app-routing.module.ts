import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

// Import ProfileComponent
import { ProfileComponent } from './profile/profile.component';

// Add profile path to routes array
const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [OktaAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
