import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth) { 
    
  }
  //Mertodo para loguearse en la autentificación de Firebase
  onLogin (user: User){    
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(user=>Promise.resolve(user))
        //Mensaje de error si el usuario no se a registrado o la contraseña falla
        .catch (err=>Promise.reject(err))    
  }
  // Mertodo para Registrarse en la autentificación de Firebase
  async onRegister (user: User){
    return this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .then((res)=>{
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    })
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err))    
  }
  // Devuelve la session
  get Session(){
    return this.afAuth.authState;
  }
  // Logout de usuario o salir de la sección
  logout(){
    this.afAuth.auth.signOut().then();
  }
  // Obtenemos el id de usuario.
  getUser(){
    return this.afAuth.auth.currentUser?.uid;
  }
  //Metodo para restablecer contraseña
  resetPassword(email:any){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
