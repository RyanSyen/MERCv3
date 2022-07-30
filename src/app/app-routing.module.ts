import { NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Required components for which route services to be activated
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MainComponent } from './component/user-profile/main/main.component';
import { FaqComponent } from './component/faq/faq.component';
import { HomeMainComponent } from './component/home/home-main/home-main.component';
import { CategoriesMainComponent } from './component/categories/categories-main/categories-main.component';
import { TestComponent } from './component/test/test.component';
import { MainProductDetailsComponent } from './component/product-details/main-product-details/main-product-details.component';
import { CartComponent } from './component/cart/cart.component';

// Import canActivate guards
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';

import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'user-profile',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'home', component: HomeMainComponent },
  { path: 'categories', component: CategoriesMainComponent },
  { path: 'test', component: TestComponent },
  { path: 'product_details/:id/:type', component: MainProductDetailsComponent },
  { path: 'cart', component: CartComponent },

];

export let browserRefresh = false;


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnDestroy {
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
