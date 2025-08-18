import { AuthService } from '@/app/core/services/authService';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AnimationLogin } from './components/animation-login/animation-login';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { inputList } from '@/app/utils/Lists';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AnimationLogin,
    FormsModule,
  ],

  templateUrl: './form-login-register.html',
})
export class FormLoginRegisterComponent implements OnInit {
  form!: FormGroup;
  isRegisterMode: boolean = false;
  inputList = inputList;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
    // Aplicar el modo actual después de inicializar el formulario
    this.changeMode(this.isRegisterMode);
  }

  login() {
    // Siempre marcar los campos como tocados para mostrar validaciones
    this.markFormGroupTouched(this.form);
    
    if (this.form.valid) {
      console.log('Login con:', this.form.value);
      this.authService.signIn(this.form.value.email, this.form.value.password);
    }
  }

  signup() {
    // Siempre marcar los campos como tocados para mostrar validaciones
    this.markFormGroupTouched(this.form);
    
    if (this.form.valid) {
      console.log('Registro con:', this.form.value);
      this.authService.signup(this.form.value.email, this.form.value.password, this.form.value.username);
    }
  }
  
  // Marcar todos los campos como tocados para mostrar validaciones
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  changeMode(register: boolean) {
    this.isRegisterMode = register;

    if (this.isRegisterMode) {
      this.form.addControl(
        'username',
        this.fb.control('', [Validators.required, Validators.minLength(6)])
      );
    } else {
      // Si estamos en modo login, eliminamos username si existe
      if (this.form.get('username')) {
        this.form.removeControl('username');
      }
    }
  }
}
