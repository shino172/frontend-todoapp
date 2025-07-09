import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../tasks/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({ email: [''], password: [''] });
  }

  onSubmit() {
    this.authService.signup(this.form.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert('Email đã tồn tại'),
    });
  }
  login(){
    this.router.navigate(['/login'])
  }
}
