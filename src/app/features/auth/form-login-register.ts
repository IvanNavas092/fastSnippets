import { AuthService } from '@/app/core/services/auth';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AnimationLogin } from './components/animation-login/animation-login';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AnimationLogin, FormsModule],


  templateUrl: './form-login-register.html',
})
export class FormLoginRegisterComponent {
  form!: FormGroup;
  handle: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  inputList: any[] = [
    { label: 'email', type name: 'Email', placeholder: 'tu@email.com', value: '' },
    { id: 'password', name: 'Contraseña', value: '' },
  ];

login() {
  // this.authService.signIn();
}

signup() {
  // this.authService.signup();
}

handleLogin() {
  this.handle = !this.handle;
}
}
