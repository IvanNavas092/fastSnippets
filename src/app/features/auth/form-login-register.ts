import { AuthService } from '@/app/core/services/authService';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AnimationLogin, FormsModule],

  templateUrl: './form-login-register.html',
})
export class FormLoginRegisterComponent implements OnInit {
  form!: FormGroup;
  isRegisterMode: boolean = false;
  inputList = inputList;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef // <<-- Inyectar aquí
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Limpiar error message cuando el usuario escriba
    this.form.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });

    // Aplicar el modo actual después de inicializar el formulario
    this.changeMode(this.isRegisterMode);
  }

  async login() {
    // Siempre marcar los campos como tocados para mostrar validaciones
    this.markFormGroupTouched(this.form);

    if (this.form.valid) {
      console.log('Login con:', this.form.value);
      try {
        await this.authService.signIn(
          this.form.value.email,
          this.form.value.password
        );
        await this.router.navigate(['/snippets']);
      } catch (error: any) {
        console.error('Error al iniciar sesión:', error);

        //  error codes
        if (
          error.code === 'auth/invalid-credential' ||
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/invalid-login-credentials'
        ) {
          this.errorMessage =
            'Credenciales inválidas. Verifica tu email y contraseña.';
          this.cdRef.detectChanges();
        } else if (error.code === 'auth/user-disabled') {
          this.errorMessage = 'Esta cuenta ha sido deshabilitada.';
        } else if (error.code === 'auth/too-many-requests') {
          this.errorMessage =
            'Demasiados intentos fallidos. Intenta más tarde.';
        } else {
          this.errorMessage = `Error al iniciar sesión: ${
            error.code || error.message
          }`;
        }
      }
    }
  }

  signup() {
    // Siempre marcar los campos como tocados para mostrar validaciones
    this.markFormGroupTouched(this.form);

    if (this.form.valid) {
      console.log('Registro con:', this.form.value);
      this.authService.signup(
        this.form.value.email,
        this.form.value.password,
        this.form.value.username
      );
    }
  }

  // Marcar todos los campos como tocados para mostrar validaciones
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
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
    this.errorMessage = ''; // Limpiar mensaje de error al cambiar modo

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
