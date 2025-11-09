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
import { IaAgentService } from '@/app/core/services/ia-agent-service';

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
    private iaAgentService: IaAgentService,
    private router: Router,
    private cdRef: ChangeDetectorRef
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
    if (this.form.valid) {
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
    if (this.form.valid) {
      this.authService
        .signup(
          this.form.value.email,
          this.form.value.password,
          this.form.value.username
        )
        .then(() => {
          this.router.navigate(['/snippets']);
          this.form.reset();
        }),
        () => {
          console.error('Error al registrar usuario:');
        };
    }
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
  goBack() {
    window.history.back();  
  }

}
