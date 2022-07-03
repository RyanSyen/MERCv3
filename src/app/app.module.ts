import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

// routing
import { AppRoutingModule } from './app-routing.module';


// services
import { AuthService } from './shared/auth.service';
import { ProductService } from './service/productservice';
import { PhotoService } from './service/photoservice';

// Import canActivate guards
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';


// other packages
import lottie from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
// import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';

// components
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HeaderEmptyComponent } from './component/header/header-empty/header-empty.component';
import { HeaderNormalComponent } from './component/header/header-normal/header-normal.component';
import { MainComponent } from './component/user-profile/main/main.component';
import { FaqComponent } from './component/faq/faq.component';
import { BannerComponent } from './component/home/banner/banner.component';
import { HomeMainComponent } from './component/home/home-main/home-main.component';
import { CategoriesComponent } from './component/home/categories/categories.component';
import { DiscountedProductsComponent } from './component/home/discounted-products/discounted-products.component';
import { ArComponent } from './component/home/ar/ar.component';
import { ProductListComponent } from './component/categories/product-list/product-list.component';
import { CategoriesMainComponent } from './component/categories/categories-main/categories-main.component';
import { SearchComponent } from './component/header/search/search.component';
import { TestComponent } from './component/test/test.component';
import { HeadComponent } from './component/home/head/head.component';
import { MainProductDetailsComponent } from './component/product-details/main-product-details/main-product-details.component';
import { SimilarProductsComponent } from './component/product-details/similar-products/similar-products.component';
import { ProductDetailsAccordionComponent } from './component/product-details/product-details-accordion/product-details-accordion.component';
import { ProductDetailsGalleryComponent } from './component/product-details/product-details-gallery/product-details-gallery.component';
import { FooterComponent } from './component/footer/footer.component';
import { RatingComponent } from './component/product-details/rating/rating.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderNormalComponent,
    HeaderEmptyComponent,
    MainComponent,
    FaqComponent,
    BannerComponent,
    CategoriesComponent,
    DiscountedProductsComponent,
    ArComponent,
    ProductListComponent,
    CategoriesMainComponent,
    HomeMainComponent,
    SearchComponent,
    TestComponent,
    HeadComponent,
    MainProductDetailsComponent,
    SimilarProductsComponent,
    ProductDetailsAccordionComponent,
    ProductDetailsGalleryComponent,
    FooterComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    SlickCarouselModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [AuthService, AuthGuard, ProductService, PhotoService, SecureInnerPagesGuard, { provide: FIREBASE_OPTIONS, useValue: environment.firebase  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
