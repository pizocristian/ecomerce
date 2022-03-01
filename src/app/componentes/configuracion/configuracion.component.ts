import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  providers: [MessageService]
})
export class ConfiguracionComponent implements OnInit {
  
  countries: any[]=[];

  direccion: any;
  telefono:any;
  ciudad:any;
  nombre:any;
  barrio:any;
 
  constructor(private firestoreService: FirestoreService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.firestoreService.getUsuario().valueChanges().subscribe(res=>{
        let user:any=res;
        this.direccion=user.direccion;
        this.telefono=user.telefono;
        this.ciudad={name: user.ciudad, code: user.ciudad};
        this.nombre=user.nombre;
        this.barrio=user.barrio;
       })
    
       this.countries = [
        {name: 'New York', code: 'New York'},
        {name: 'Rome', code: 'Rome'},
        {name: 'London', code: 'London'},
        {name: 'Istanbul', code: 'Istanbul'},
        {name: 'Paris', code: 'Paris'}
    ];
    
  }

  postDataPerson(){

    let persona={barrio:this.barrio,direccion:this.direccion, telefono:this.telefono,ciudad:this.ciudad.name,nombre:this.nombre}
    console.log(persona)
    this.firestoreService.postUsuario(persona).then(res=>{
        this.messageService.add({severity:'success', summary:'Datos guardados', detail:'Datos Guardados con exito'});
    }).catch(res=>{
        console.log(res)
    })
  }

}
