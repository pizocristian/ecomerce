import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, map } from 'rxjs/operators';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{

  @ViewChild(MatSidenav)

  sidenav!: MatSidenav;
  items:any= [];
  textSession:any;
  numberBadge:any;

  constructor(private router: Router, private observer: BreakpointObserver, private firestoreService: FirestoreService, private authService: AuthService, private AFauth: AngularFireAuth) {
    this.firestoreService.getCategorias().valueChanges().subscribe(res=>{
      this.items= res;
    })   

    this.authService.Session.subscribe(session=>{
      //Si la session es tru inicia en la primera pagina del tabs
      if(session){
        this.textSession="Cerrar session"
        this.firestoreService.getCarrito().valueChanges().subscribe(res =>{
          this.numberBadge=res.length;
        })
      }
        //Si la sessión no esta iniciada inicia la app en el login
        else{
          this.textSession="Iniciar session"
        }
    });
    
  }

  session(){
    if(this.textSession=="Cerrar session"){
      this.authService.logout();
       location.reload();
    }else{
      this.router.navigateByUrl('home/login');  
    }
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  GetCarrito(){
    
    return localStorage.getItem('carrito')
  }

}