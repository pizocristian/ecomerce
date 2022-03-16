import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './componentes/card/card.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { HomeComponent } from './componentes/home/home.component';
import { CartComponent } from './componentes/cart/cart.component';
import { ProductsComponent } from './componentes/products/products.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { Noauth } from './services/guards/noauth.guard';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { AuthGuard } from './services/guards/auth.guard';
import { PedidoComponent } from './componentes/pedido/pedido.component';

const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo: '/home/card/zapatillas',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   children:[
  //     {path:'card/:categoria', component:CardComponent},
  //     {path: 'detalle/:categoria/:id', component:DetalleComponent},
  //     {path: 'cart', component:CartComponent, canActivate: [AuthGuard]},
  //     {path: 'login', component:LoginComponent, canActivate: [Noauth]},
  //     {path: 'registro', component:RegistroComponent, canActivate: [Noauth]},
  //     {path: 'configuracion', component:ConfiguracionComponent, canActivate: [AuthGuard]},
  //     {path: 'pedidos', component:PedidosComponent, canActivate: [AuthGuard]},
  //     {path: 'pedido/:id', component:PedidoComponent, canActivate: [AuthGuard]} 
    
  //   ]
  // },
  // {
  //   path: '**',
  //   component: HomeComponent
  // }

  {
    path:'',
    redirectTo: '/home/card/zapatillas',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children:[
          {path:'card/:categoria', component:CardComponent},
           {path: 'detalle/:categoria/:id', component:DetalleComponent},
           {path: 'cart', component:CartComponent, canActivate: [AuthGuard]},
           {path: 'login', component:LoginComponent, canActivate: [Noauth]},
           {path: 'registro', component:RegistroComponent, canActivate: [Noauth]},
           {path: 'configuracion', component:ConfiguracionComponent, canActivate: [AuthGuard]},
           {path: 'pedidos', component:PedidosComponent, canActivate: [AuthGuard]},
           {path: 'pedido/:id', component:PedidoComponent, canActivate: [AuthGuard]} 
        
         ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
