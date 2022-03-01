import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  products: any=[];

    constructor(private firestoreService: FirestoreService) { }

    ngOnInit() {
      this.firestoreService.getPedidos().valueChanges().subscribe(res =>{
       this.products=res;
      })
    }
        
  }