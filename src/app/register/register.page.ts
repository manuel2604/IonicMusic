import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  validationMessages = {
    nombre: [
      {type: 'required', message: 'El nombre es requerido'}
    ],
    apellido: [
      {type: 'required', message: 'El apellido es requerido'}
    ],
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
  constructor(private authService: AuthenticateService,private fb: FormBuilder, private navCtrl: NavController, private storage: Storage) {
    this.registerForm = this.fb.group({
      nombre: new FormControl("", Validators.compose([
        Validators.required
      ])),
      apellido: new FormControl("", Validators.compose([
        Validators.required
      ])),
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

  registerUser(registerData){
    this.authService.registerUser(registerData).then(() => {
      this.navCtrl.navigateBack('/login');
    })
  }

  goToLogin(){
    this.navCtrl.navigateBack('/login');
  }

}
