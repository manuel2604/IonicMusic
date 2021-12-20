import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validationMessages = {
    email: [
      {type: 'required', message: 'El email es requerido'},
      {type: 'email', message: 'Debe ingresar un email'}
    ],
    password: [
      {type: 'required', message: 'La contraseña es requerida'},
      {type: 'minlength', message: 'Debe ingresar al menos 8 caracteres'}
    ]
  }
  errorMessage: string = '';
  
  constructor(private fb: FormBuilder, private authService: AuthenticateService, private navCtrl: NavController, private storage: Storage) {
    this.loginForm = this.fb.group({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    });
  }

  ngOnInit() {
  }

  loginUser(credentials){
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = "";
      this.storage.create();
      this.storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/menu/home');
    }).catch(err => {
      this.errorMessage = err;
    });
  }

  goToRegister(){
    this.navCtrl.navigateForward('/register');
  }
}
