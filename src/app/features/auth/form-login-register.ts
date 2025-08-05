import { AuthService } from '@/app/core/services/auth';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-login-register.html',
  providers: [AuthService, Auth], // Añade esto
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
