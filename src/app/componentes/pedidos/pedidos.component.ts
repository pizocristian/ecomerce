import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  products: any=[1,2,3,4,5,6,7,8,9,20,22,12];

    constructor(private firestoreService: FirestoreService) { }

    ngOnInit() {
      this.firestoreService.getPedidos().valueChanges().subscribe(res =>{
       this.products=res;
      })
    }
        
  }