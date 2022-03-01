import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/usuario.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:User ={
    email:'',
    password:''
  };

  registroUsuario:User ={
    email:'',
    password:''
  };

  password:any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async Loguearse(){   
    this.authService.onLogin(this.usuario).then(res => {
      this.router.navigateByUrl('/');    
    }).catch(err=>{
      if(err.code=='auth/user-not-found'){
        window.alert('no se encontro el correo')
      }if(err.code=='auth/invalid-email'){
        window.alert('correo invalido')
      }if(err.code=='auth/wrong-password'){
      window.alert('contraseña incorrecta')   
      }
      console.log(err.code)
    })
  }

  registrarUsuario(){   
    if(this.password == this.registroUsuario.password){
    this.authService.onRegister(this.registroUsuario).then(res => {
     console.log(res)
     location.reload();
    }).catch(err=>{
      if(err.code=='auth/weak-password'){
        window.alert('La contraseña debe tener minimo 6 caracteres')
      }if(err.code=='auth/invalid-email'){
        window.alert('Correo invalido')
      }if(err.code=='auth/email-already-in-use'){
      window.alert('El correo esta siendo usado por otra cuenta')   
      }
      console.log(err)
    })
  }else{
    window.alert('Las contraseñas no considen')
  }
}
}
