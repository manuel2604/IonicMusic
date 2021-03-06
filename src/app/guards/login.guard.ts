import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router){

  }
  async canActivate(){ 
    this.storage.create();
    const isUserLoggedIn = await this.storage.get('isUserLoggedIn');
    if(isUserLoggedIn){
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  
}
