import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Storage} from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router){

  }
  async canActivate(){ 
    this.storage.create();
    const isIntroShowed = await this.storage.get('isIntroShowed');
    console.log(isIntroShowed);
    if(isIntroShowed){
      return true;
    } else {
      this.router.navigateByUrl('/intro');
    }
  }
}
