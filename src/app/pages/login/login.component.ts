import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink ,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  isLoading: boolean = false;
  msgError:string ="";
  Success:string = "";

  loginForm: FormGroup =this.formBuilder.group({
    email:[null , [Validators.required, Validators.email]],
    password:[ null , [Validators.required, Validators.pattern(/^[A-Z]\w{7}$/)]],
  })

  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7}$/)]),
    
  // });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginFOrm(this.loginForm.value).subscribe({
        next: (res) => { console.log(res);
        if (res.message == 'success')
        {
          setTimeout(()=>{
            //1-Save Token
            localStorage.setItem('userToken', res.token);
            
            //2-Dcode Token
            this.authService.saveUserData();
            //3-navigate Token
            this.router.navigate(['/home']);} , 500)
          this.Success = res.message;
        };
        this.isLoading = false; },
        error: (err) => { console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;}
      })
    }


  }


}
