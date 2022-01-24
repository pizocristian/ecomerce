import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numberBadge:any;

  constructor(private firestoreService: FirestoreService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.Session.subscribe(session=>{
      //Si la session es tru inicia en la primera pagina del tabs
      if(session){
        this.firestoreService.getCarrito().valueChanges().subscribe(res =>{
          this.numberBadge=res.length;
          localStorage.setItem('numberCart', this.numberBadge)
        })
      }
    });
    
  }

}
