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
      if(res){
        let user:any=res;
        this.direccion=user.direccion;
        this.telefono=user.telefono;
        this.ciudad={name: user.ciudad, code: user.ciudad};
        this.nombre=user.nombre;
        this.barrio=user.barrio;
      }else{
        this.direccion='';
        this.telefono='';
        this.ciudad='';
        this.nombre='';
        this.barrio='';
      }
       })
    
       this.countries = [
        {name: 'Cali', code: 'Cali'},
        {name: 'Palmira', code: 'Palmira'},
        {name: 'Jamundi', code: 'Jamundi'},
        {name: 'Candelaria', code: 'Candelaria'},
        {name: 'Buga', code: 'Buga'}
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
