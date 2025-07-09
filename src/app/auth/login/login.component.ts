import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../tasks/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({ email: [''], password: [''] });
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        console.log('Dữ liệu nhận từ server:', res);

        if (res?.token) {
          this.authService.saveToken(res.token);
          this.router.navigate(['/list']);
        } else {
          alert('Không nhận được token từ server!');
        }
      },
      error: (err) => {
        console.error('Lỗi đăng nhập:', err);
        alert(err.error?.error || 'Đăng nhập thất bại');
      }
    });
  }

  signup(){
    this.router.navigate(['/register']);
  }
}
