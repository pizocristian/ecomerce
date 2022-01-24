import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  items:any= [];
  categoria:any;
  totalRecords:any;
  
  constructor(private firestoreService: FirestoreService, activatedRoute:ActivatedRoute) { 
     activatedRoute.paramMap.subscribe(params => { 
      this.categoria = params.get ("categoria");
      this.firestoreService.getProductos(this.categoria).valueChanges().subscribe(res=>{
        this.items=res;
      })       
    }) 
  }

  ngOnInit(): void {
    
  }

}
