
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.route';
import { CATEGORYCOMPONENTS } from './component/category';
import { PRODUCTCOMPONENTS } from './component/product';
import { SEARCHCOMPONENTS } from './component/search';
import { ShoppingCartComponent } from './component/cart';
import { TEMPLATECOMPONENTS } from './component/template';
import { HOMECOMPONENTS } from './component/home';
import { RegisterComponent } from './component/register/register.component';
import { PaymentComponent } from './component/payment/payment.component';
import { LoginComponent } from './component/login/login.component';
import { HttpModule } from '@angular/http';
import { ItemService } from './service/item.service';
import { CategoryService } from './service/category.service';
import { FacebookModule } from 'ngx-facebook';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './component/account/account.component';
import { TokenService } from './service/token.service';
import { ShareService } from './service/share.service';
import { ActivateGuard } from './security/activate.guard';
import { SupplierGuard } from './security/supplier.guard';
import { NoLoggedGuard } from './security/no-logged.guard';
import { CartService } from './service/cart.service';
import { CheckoutComponent } from './component/payment/index';
import { OnFocusDirective } from './directive/focus-class.directive';
import { OrderService } from './service/order.service';
import { PaginationService } from './service/pagination.service';
import { RangePipe } from './pipe/range.pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProfileComponent } from './component/profile/profile.component';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-cloudinary/dist/esm/src/cloudinary-uploader.service';
import { HistoryOrderComponent } from './component/history-order/history-order.component';
import { HistoryOrderDetailComponent } from './component/history-order-detail/history-order-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderDetailComponent } from './component/account/orderDetail/orderDetail.component';
import { ShowInfoComponent } from './component/profile/show-info/show-info.component';
import { UpdateInfoComponent } from './component/profile/update-info/update-info.component';
import { UserService } from './service/user.service';
import { DataTableModule } from 'angular2-datatable';
import { StoreService } from './service/store.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CATEGORYCOMPONENTS,
    PRODUCTCOMPONENTS,
    SEARCHCOMPONENTS,
    ShoppingCartComponent,
    TEMPLATECOMPONENTS,
    HOMECOMPONENTS,
    CheckoutComponent,
    // ProductListComponent
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    OrderDetailComponent,
    OnFocusDirective,
    RangePipe,
    ProfileComponent,
    ShowInfoComponent,
    UpdateInfoComponent,
    HistoryOrderComponent,
    HistoryOrderDetailComponent
  ],
  imports: [
    routing,
    FacebookModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    NgxPaginationModule,
    DataTableModule
  ],
  providers: [
    ActivateGuard,
    TokenService,
    ShareService,
    SupplierGuard,
    NoLoggedGuard,
    CartService,
    OrderService,
    PaginationService,
    ItemService,
    CategoryService,
    StoreService,
    UserService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
