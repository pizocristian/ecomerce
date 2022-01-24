import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usuario.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:User ={
    email:'',
    password:''
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  async registrarUsuario(){   
     this.authService.onRegister(this.usuario).then(res => {
      console.log(res)
      location.reload();
     }).catch(err=>{
      console.log(err)
     })
   }

}
