import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { Router } from '@angular/router';

interface Transaction {
  id_carrito:any;
  id:any;
  nombre: string;
  talla: string;
  color:string;
  precio: any;
  foto:any;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ConfirmationService,MessageService]
})

export class CartComponent implements OnInit {
  

  displayedColumns: string[] = ['foto','nombre', 'talla','color','precio', 'accion'];
  transactions: Transaction[] = [];
  direccion:any;
  telefono:any;
  barrio:any;
  displayResponsive: boolean=false;
  countries: any[]=[];
  selectedCity2: any;
  nombre:any;

  constructor(private router: Router,private confirmationService: ConfirmationService, private firestoreService: FirestoreService,private messageService: MessageService) { 
    this.firestoreService.getCarrito().valueChanges().subscribe(res =>{
      let respuesta:any=res;
      this.transactions=respuesta;
    })
    this.firestoreService.getUsuario().valueChanges().subscribe(res=>{
      let user:any=res;
      this.direccion=user.direccion;
      this.telefono=user.telefono;
      this.selectedCity2={cname: user.ciudad, code: user.ciudad};
      this.nombre=user.nombre;
      this.barrio=user.barrio;
     })
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.precio).reduce((acc, value) => acc + value, 0);
  }

  getCompra() {
    return this.getTotalCost()*100;
  }

  validar(){

    if(this.selectedCity2==null){
      window.alert('Agregar ciudad')
      return false
    }if(this.barrio==""||this.barrio==null){
      window.alert('Agregar barrio')
      return false
    }if(this.direccion==""||this.direccion==null){
      window.alert('Agregar dirección')
      return false
    }if(this.telefono==""||this.telefono==null){
      window.alert('Agregar telefono')
      return false
    }else{
      return true;
    }
  }

  ngOnInit(): void {
    this.countries = [
      {
          name: 'Colombia',
          code: 'CO',
          states: [
              {
                  name: 'Valle del cauca',
                  cities: [
                      {cname: 'Cali', code: 'Cali'},
                      {cname: 'Palmira', code: 'Palmira'},
                      {cname: 'Jamundi', code: 'Jamundi'}
                  ]
              },
              {
                  name: 'Quindio',
                  cities: [
                      {cname: 'Brisbane', code: 'A-BR'},
                      {cname: 'Townsville', code: 'A-TO'}
                  ]
              },
              
          ]
      },
      {
          name: 'United States',
          code: 'US',
          states: [
              {
                  name: 'California',
                  cities: [
                      {cname: 'Los Angeles', code: 'US-LA'},
                      {cname: 'San Diego', code: 'US-SD'},
                      {cname: 'San Francisco', code: 'US-SF'}
                  ]
              },
              {
                  name: 'Florida',
                  cities: [
                      {cname: 'Jacksonville', code: 'US-JA'},
                      {cname: 'Miami', code: 'US-MI'},
                      {cname: 'Tampa', code: 'US-TA'},
                      {cname: 'Orlando', code: 'US-OR'}
                  ]
              },
              {
                  name: 'Texas',
                  cities: [
                      {cname: 'Austin', code: 'US-AU'},
                      {cname: 'Dallas', code: 'US-DA'},
                      {cname: 'Houston', code: 'US-HO'}
                  ]
              }
          ]
      }
  ];
  }

  eliminarProducto(id:any) {
    this.confirmationService.confirm({
        message: '¿Seguro que deseas eliminar este producto?',
        header: 'Confirme para eliminar',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.firestoreService.deleteProductCart(id).then(res=>{
            this.messageService.add({key: 'bc', severity:'success', summary: 'Eliminado', detail: 'Producto eliminado con exito'});    
          }).catch(res=>{
            console.log(res);
          })
        },
        reject: (type:any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'Tu has cancelado'});
                break;
            }
        }
    });
}

  realizarCompra(){
    if(this.getCompra()!==0){
    this.displayResponsive = true; 
    }else{
      window.alert("debe agregar un producto")
    }

   
  }

  confirma(){
    console.log(this.getCompra())
      let total=this.getCompra();
      
      let pedido ={telefono:this.telefono,id_pedido:'CE2',precioTotal:total/100,foto:this.transactions[0].foto, estado:'En revisión', ciudad:this.selectedCity2.cname, barrio:this.barrio, direccion:this.direccion, productos:this.transactions }
      console.log(pedido)
       this.firestoreService.postPedido(pedido).then(res=>{
         this.firestoreService.deleteCart().then(res=>{          
            window.location.href='https://checkout.wompi.co/p/?public-key=pub_prod_OAFUo9PEVdvjkHSPGPyNaBTk9zrcysQi&currency=COP&amount-in-cents='+total+'&reference='+this.generarReferenciaPago()+'&redirect-url=http%3A%2F%2Flocalhost%3A4200%2Fhome%2Fcart'
         }).catch(res=>{
           console.log(res)
         })
       }).catch(res=>{
         console.log(res)
       })
   
  }

  cancelar(){
    this.displayResponsive = false;
  }

  generarReferenciaPago(){
    let cod='778912391'
    return cod;
  }

}
