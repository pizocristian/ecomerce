import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.addProducto(5).then(res=>{
      console.log(res)
    })
  }

}