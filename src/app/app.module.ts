import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { CardComponent } from './componentes/card/card.component';
import { HeaderComponent } from './componentes/header/header.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { CartComponent } from './componentes/cart/cart.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ProductsComponent } from './componentes/products/products.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { RespuestaComponent } from './componentes/respuesta/respuesta.component';
import { PedidoComponent } from './componentes/pedido/pedido.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { TodoComponent } from './componentes/todo/todo.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DataViewModule} from 'primeng/dataview';
import {OrderListModule} from 'primeng/orderlist';
import {BadgeModule} from 'primeng/badge';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {PaginatorModule} from 'primeng/paginator';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {GalleriaModule} from 'primeng/galleria';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    HomeComponent,
    MenuComponent,
    CardComponent,
    HeaderComponent,
    DetalleComponent,
    CartComponent,
    NavbarComponent,
    ProductsComponent,
    RespuestaComponent,
    PedidoComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionComponent,
    PedidosComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatBadgeModule,
    MatTableModule,
    MatMenuModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatCarouselModule.forRoot(),
    MdbCheckboxModule,
    MdbCarouselModule,
    MatButtonToggleModule,
    MatDialogModule,
    CardModule,
    ButtonModule,
    InputSwitchModule,
    SelectButtonModule,
    DataViewModule,
    OrderListModule,
    BadgeModule,
    InputTextModule,
    ToastModule,
    CascadeSelectModule,
    PaginatorModule,
    ConfirmDialogModule,
    DialogModule,
    GalleriaModule,
  ],
  providers: [
    ConfirmationService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
