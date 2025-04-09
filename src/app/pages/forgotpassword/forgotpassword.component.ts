import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
submitForm() {
throw new Error('Method not implemented.');
}

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  step:number = 1 ;


  verifyEmail: FormGroup =this.formBuilder.group({
    email:[null , [Validators.required, Validators.email]],
  })


  verifyCode: FormGroup =this.formBuilder.group({
    resetCode:[null , [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  })



  resetPassword: FormGroup =this.formBuilder.group({
    email:[null , [Validators.required, Validators.email]],
    newPassword:[ null , [Validators.required, Validators.pattern(/^[A-Z]\w{7}$/)]],
  })

  
  verifyEmailSubmit():void {

    //submit----> Get Value --- Email Form1-------> Set ------> Form3
    let emailValue = this.verifyEmail.get('email')?.value;
    this.isLoading = true;

    this.resetPassword.get('email')?.patchValue(emailValue)

    this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg == 'success')
          {
            this.step =2;
          }
          this.isLoading = false; 
      },
      error:(err)=>{console.log(err); this.isLoading = false; }
    })
  }

  verifyCodeSubmit():void {
    this.isLoading = true;
    this.authService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status == 'Success')
          {
            this.step = 3;
          };
          this.isLoading = false;
      },
      error:(err)=>{console.log(err); this.isLoading = false;}
    })
  }

  resetPasswordSubmit():void {
    this.isLoading = true;
    this.authService.setResetPass(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoading = false;
        localStorage.setItem('userToken' ,res.token);
        this.authService.saveUserData();
        this.router.navigate(['/home']);
      },
      error:(err)=>{console.log(err); this.isLoading = false;}
    })
  }

  
  
    





}
