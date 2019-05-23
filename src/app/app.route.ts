import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './component/category/category.component';
import {ProductComponent} from './component/product/product.component';
import {CartComponent} from './component/cart/cart.component';
import {HomeComponent} from './component/home/home.component';
import {NotFoundComponent} from './component/template/not-found/not-found.component';
import {LoginComponent} from './component/login/login.component';
import {AccountComponent} from './component/account/account.component';
import {ActivateGuard} from './security/activate.guard';
import {NoLoggedGuard} from './security/no-logged.guard';
import {PaymentComponent} from './component/payment/payment.component';
import {SearchComponent} from './component/search/search.component';
import {OrderDetailComponent} from './component/account/orderDetail/orderDetail.component';
import {ProfileComponent} from './component/profile/profile.component';
import {ShowInfoComponent} from './component/profile/show-info/show-info.component';
import {UpdateInfoComponent} from './component/profile/update-info/update-info.component';
import {HistoryOrderComponent} from './component/history-order/history-order.component';
import {HistoryOrderDetailComponent} from './component/history-order-detail/history-order-detail.component';
import {RegisterComponent} from './component/register/register.component';

const appRoutes: Routes = [

    {
        path: 'category', children: [
        {
            path: '', component: CategoryComponent, data: {
            breadcrumb: 'Tất cả sản phẩm'
        }
        },
        {
            path: ':id', component: CategoryComponent, data: {
            breadcrumb: 'Danh mục sản phẩm'
        }
        }],
        data: {
            breadcrumb: 'Danh mục'
        }
    },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoLoggedGuard]
  },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoLoggedGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'store',
        component: HomeComponent
    },
    {
        path: 'detail',
        children: [
            {path: ':id', component: ProductComponent,
              data: {
                  title: 'Trang chi tiết',
                  breadcrumb: 'Chi tiết'
              }
            }
        ],
      data: {
        title: 'Trang chi tiết',
        breadcrumb: 'Chi tiết'
      },
    },
    {
        path: 'cart',
        component: CartComponent,
        data: {
            title: 'Giỏ hàng',
            breadcrumb: 'Giỏ hàng'
        },
    },
    {
        path: 'checkout',
        component: PaymentComponent,
        data: {
            title: 'Thanh toán',
            breadcrumb: 'Thanh toán'
        },
        canActivate: [ActivateGuard]
    },
    {
        path: 'account',
        component: AccountComponent,
        data: {title: 'Cart List'},
        // canActivate: [ActivateGuard]
    },
    {path: 'order/:id', component: OrderDetailComponent, data: {}},
    {
        path: 'sss',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {path: 'home', component: HomeComponent, data: {}},
    {path: 'search',
        children: [
            {path: ':id', component: SearchComponent}
        ]},
    { path: 'profile', component: ProfileComponent,
        children: [
            { path: '', component: ShowInfoComponent},
            { path: 'edit', component: UpdateInfoComponent}
        ]
    },
    { path: 'history-orders', component: HistoryOrderComponent},
    { path: 'order-detail/:id', component: HistoryOrderDetailComponent},
    {path: '**', component: NotFoundComponent}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
