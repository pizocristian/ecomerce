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
        this.ciudad={cname: user.ciudad, code: user.ciudad};
        this.nombre=user.nombre;
        this.barrio=user.barrio;
       })
    
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
          name: 'Mexico', 
          code: 'ME',
          states: [
              {
                  name: 'Quebec',
                  cities: [
                      {cname: 'Montreal', code: 'C-MO'},
                      {cname: 'Quebec City', code: 'C-QU'}
                  ]
              },
              {
                  name: 'Ontario',
                  cities: [
                      {cname: 'Ottawa', code: 'C-OT'},
                      {cname: 'Toronto', code: 'C-TO'}
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

  postDataPerson(){

    let persona={barrio:this.barrio,direccion:this.direccion, telefono:this.telefono,ciudad:this.ciudad.cname,nombre:this.nombre}
    console.log(persona)
    this.firestoreService.postUsuario(persona).then(res=>{
        this.messageService.add({severity:'success', summary:'Datos guardados', detail:'Datos Guardados con exito'});
    }).catch(res=>{
        console.log(res)
    })
  }

}
