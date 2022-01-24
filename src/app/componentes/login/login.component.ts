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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async Loguearse(){   
    this.authService.onLogin(this.usuario).then(res => {
      this.router.navigateByUrl('/');    
    }).catch(err=>{
     console.log(err)
    })
  }

  registrarUsuario(){   
    this.authService.onRegister(this.registroUsuario).then(res => {
     console.log(res)
     location.reload();
    }).catch(err=>{
     console.log(err)
    })
  }
}
