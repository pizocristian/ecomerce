import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor( private firestore: AngularFireDatabase, private authService: AuthService) {}
  
  addProducto(producto:any){
    return this.firestore.database.ref('ecommerce/clients/ce1/products/gorras/3').set(producto);
  }

  getTodosProductos(){
    return this.firestore.list('ecommerce/clients/ce1/products/', ref => {
      return ref.orderByChild('id')
    });
  }

  getTodosProductoss(){
    return this.firestore.object('ecommerce/clients/ce1/products/');
  }

  getProductos(categoria:any){
    return this.firestore.list('ecommerce/clients/ce1/products/'+categoria);
  }

  getProducto(categoria:any, id:any){
    return this.firestore.object('ecommerce/clients/ce1/products/'+categoria+'/'+id);
  }

  getCategorias(){
    return this.firestore.list('ecommerce/clients/ce1/categorias');
  }

  getTallas(categoria:any, id:any){
    return this.firestore.list('ecommerce/clients/ce1/products/'+categoria+'/'+id+'/tallas');
  }

  getColores(categoria:any, id:any){
    return this.firestore.list('ecommerce/clients/ce1/products/'+categoria+'/'+id+'/colores');
  }
  getFotos(categoria:any, id:any){
    return this.firestore.list('ecommerce/clients/ce1/products/'+categoria+'/'+id+'/fotos');
  }

  postCarrito(carrito:any){
    return this.firestore.database.ref('ecommerce/clients/ce1/users/'+this.authService.getUser()+'/cart/'+carrito.id_carrito+'/').set(carrito);
  }

  getCarrito(){
    return this.firestore.list('ecommerce/clients/ce1/users/'+this.authService.getUser()+'/cart');
  }

  deleteProductCart(id_carrito:any){
    return this.firestore.database.ref('ecommerce/clients/ce1/users/'+this.authService.getUser()+'/cart/'+id_carrito).remove();
  }

  deleteCart(){
    return this.firestore.database.ref('ecommerce/clients/ce1/users/'+this.authService.getUser()+'/cart/').remove();
  }

  postPedido(pedido:any){
    return this.firestore.database.ref('ecommerce/clients/ce1/users/'+this.authService.getUser()+'/pedidos/'+pedido.id_pedido+'/').set(pedido);
  }

  getPedidos(){
    return this.firestore.list('ecommerce/clients/ce1/users/'+this.authService.getUser()+'/pedidos/');
  }

  getPedido(id_pedido:any){
    return this.firestore.object('ecommerce/clients/ce1/users/'+this.authService.getUser()+'/pedidos/'+id_pedido);
  }

  postUsuario(usuario:any){
    return this.firestore.database.ref('ecommerce/clients/ce1/users/'+this.authService.getUser()+'/user/').set(usuario);
  }

  getUsuario(){
    return this.firestore.object('ecommerce/clients/ce1/users/'+this.authService.getUser()+'/user/')
  }

  getCodeFactura(){
    return this.firestore.list('ecommerce/clients/ce1/pedidos');
  }

  postCodeFactura(cod:any){
   return this.firestore.database.ref('ecommerce/clients/ce1/pedidos/'+cod+'/').set(cod);
  }
}