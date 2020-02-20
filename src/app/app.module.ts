import { ShoppingCartService } from './services/shopping-cart.service';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomFormsModule } from "ng2-validation";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';

//app components
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule, MatTableModule, MatSortModule, MatIconModule, MatButtonModule } from "@angular/material";
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgbModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path:'', component: ProductsComponent },
      { path:'products', component: ProductsComponent },
      { path:'shopping-cart', component: ShoppingCartComponent },
      { path:'login', component: LoginComponent },

      { path:'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path:'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      
      { path:'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path:'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path:'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path:'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ]),
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductFormComponent,
    ShoppingCartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
