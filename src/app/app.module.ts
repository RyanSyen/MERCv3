import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp'

// routing
import { AppRoutingModule } from './app-routing.module';


// services
import { AuthService } from './shared/auth.service';
import { ProductService } from './service/productservice';
import { PhotoService } from './service/photoservice';
import { CommentService } from './service/commentservice';

// for testing purposes
import { TicketService } from './component/test/ticketservice';

// Import canActivate guards
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';


// other packages
// import lottie from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'primeng/carousel';
import { NgxSpinnerModule } from "ngx-spinner";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from './material.module';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';


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
import { CartComponent } from './component/cart/cart.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PersonalComponent } from './component/test/personal/personal.component';
import { SeatComponent } from './component/test/seat/seat.component';
import { ConfirmationComponent } from './component/test/confirmation/confirmation.component';
import { Test1Component } from './component/test1/test1.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';


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
    RatingComponent,
    CartComponent,
    PaymentComponent,
    PersonalComponent,
    SeatComponent,
    ConfirmationComponent,
    Test1Component,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // AngularFireModule.initializeApp(environment.firebase),
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
    RippleModule,
    ToastModule,
    NgxSpinnerModule,
    OverlayPanelModule,
    TableModule,
    DialogModule,
    // DynamicDialogModule,
    MaterialModule,
    materialModules,
    MatCheckboxModule,
    ReactiveFormsModule,
    provideAnalytics(() => getAnalytics()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
  ],

  providers: [AuthService, AuthGuard, ProductService, MessageService, PhotoService, CommentService, SecureInnerPagesGuard, TicketService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor() {
    // defineLordIconElement(lottie.loadAnimation);
    FirebaseTSApp.init(environment.firebase);

  }
}
