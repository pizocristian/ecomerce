import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

interface Transaction {
  id_carrito:any;
  id:any;
  nombre: string;
  talla: string;
  color:string;
  precio: any;
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
 

  displayedColumns: string[] = ['foto','nombre', 'talla','color','precio'];
  transactions: Transaction[] = [];
  direcion:any = "/home/cart"
  pedido:any;



  constructor(private firestoreService: FirestoreService) { 
    
  }

  ngOnInit(): void {

     this.firestoreService.getPedido('CE2').valueChanges().subscribe(res =>{
      this.pedido =res;
      console.log(res)
      this.transactions=this.pedido.productos
     })
  }

    /** Gets the total cost of all transactions. */
    getTotalCost() {
      return this.transactions.map(t => t.precio).reduce((acc, value) => acc + value, 0);
    }
  
    getCompra() {
      return this.getTotalCost()*100;
    }

  eliminarProducto(id:any){  

    for (var i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].id_carrito == id) {
        this.transactions.splice(i, 1);        
        break;        
      }           
    }
    let resta=Number(localStorage.getItem('carrito')) -1
    localStorage.setItem('carrito', String(resta))
    localStorage.setItem('carrito-detalle', JSON.stringify(this.transactions))
      location.reload() 
  }
  
  hola(){
    window.alert("Hola")
    this.como();
  }

  como(){

    // this.direcion= "https://checkout.wompi.co/p/"
  }

}
