import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }

  async loginUser(credentials){
    this.storage.create();
    let registeredUser = await this.storage.get('User');
    console.log(registeredUser);
    return new Promise((accept, reject) => {
      console.log(registeredUser);
      if(credentials.email === registeredUser.email && credentials.password === atob(registeredUser.password)){
        accept('Login correcto');
      } else {
        reject('login incorrecto');
      }
    })
  }

  registerUser(registerData){
    registerData.password = btoa(registerData.password);
    this.storage.create();
    return this.storage.set('User', registerData);
  }
}
