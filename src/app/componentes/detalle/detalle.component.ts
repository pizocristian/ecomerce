import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers: [MessageService]
})
export class DetalleComponent implements OnInit {
  item:any;
  categoria:any;
  id:any;
  talla:any;
  color:any;
  tallas:any=[];
  colores:any=[];
  numberBadge:any;

  slides = [{'image': "https://firebasestorage.googleapis.com/v0/b/ecommerce-ab9a4.appspot.com/o/ce1%2Fzapatillas%2F3.jpg?alt=media&token=91471986-5d60-4b39-9881-4c8ac78f7fca"}, {'image': "https://firebasestorage.googleapis.com/v0/b/ecommerce-ab9a4.appspot.com/o/ce1%2Fzapatillas%2F1.jpg?alt=media&token=41500227-3aa8-4cb2-9ddc-049e95f5b5f0"},{'image': "https://firebasestorage.googleapis.com/v0/b/ecommerce-ab9a4.appspot.com/o/ce1%2Fzapatillas%2F2.jpg?alt=media&token=3dc67f24-9930-42e7-bbc6-b3b6238edb30"}];

  images: any[]= [{},{},{},{}];


  constructor(private router: Router,private firestoreService: FirestoreService,  activatedRoute:ActivatedRoute,private messageService: MessageService, private authService: AuthService) { 
    this.categoria = activatedRoute.snapshot.paramMap.get('categoria');
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.firestoreService.getProducto(this.categoria,this.id).valueChanges().subscribe(res=>{
      this.item=res;
     })
     this.firestoreService.getColores(this.categoria,this.id).valueChanges().subscribe(res=>{
      this.colores=res;
     }) 
     this.firestoreService.getTallas(this.categoria,this.id).valueChanges().subscribe(res=>{
      this.tallas=res;
     }) 
     this.firestoreService.getFotos(this.categoria,this.id).valueChanges().subscribe(res=>{
      
      let fotos=res
      this.images=fotos;
     }) 
     
  }

  ngOnInit(): void {
  }


onConfirm() {
  this.router.navigateByUrl('home/login');  
}

onReject() {
  this.messageService.clear('c');
}

clear() {
  this.messageService.clear();
}



  sumarCarrito(){   
    this.authService.Session.subscribe(session=>{
      if(session){
        if(this.validar()){
          let idCart= Number(localStorage.getItem('numberCart'))
          let producto = {id_carrito:idCart+1,id:this.item.id,nombre:this.item.nombre, talla:this.talla,color:this.color, precio:this.item.precio, foto:this.item.foto}
          this.firestoreService.postCarrito(producto).then(res =>{
            this.messageService.add({severity:'success', summary:'Agregado al carrito', detail:'Ya puedes ver tu carrito'});
            }).catch(res =>{
              console.log(res)
            })
        }
      }else{//Si la sessión no esta iniciada
          this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
        }
    });
    
    
    
  }

  validar(){
    if(this.talla && this.color ){
      return true;
    }else{
      this.messageService.add({key: 'tc', severity:'warn', summary: 'Por favor', detail: 'Agregar color y talla'});
      return false;
    }
  }

}
