import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app/';
@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) { }
  async loginGoogle(){
    try{
        const result = this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        return result;
    }catch(error){
      console.log(error);
    }
  }
  async sendVerificationEmail():Promise<void>{
    return (await this.afAuth.currentUser).sendEmailVerification();
  }
  async login(email:string, password:string){
    const result = await this.afAuth.signInWithEmailAndPassword(email,password);
    return result;
  }
  async register(email:string, password:string){
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.sendVerificationEmail();
    return result;
  }
  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('uidToken');
    localStorage.removeItem('uid')
  }
}
