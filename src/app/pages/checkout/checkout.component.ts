import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
  import { Component, inject, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../core/services/orders/orders.service';
import { error } from 'console';

  @Component({
    selector: 'app-checkout',
    imports: [ReactiveFormsModule,TranslatePipe],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss'
  })
  export class CheckoutComponent implements OnInit {

      private readonly formBuilder = inject(FormBuilder);
      private readonly activatedRoute = inject(ActivatedRoute);
      private readonly ordersService = inject(OrdersService);
    
      isLoading = false;
      checkOutForm!:FormGroup;
      cartId:string ='';

      ngOnInit(): void {
        this.initForm();
        this.getCartId();
      }


      initForm():void{
        this.checkOutForm = this.formBuilder.group({
          details:[null , [Validators.required]],
          phone:[null , [Validators.required ,Validators.pattern('01[0125][0-9]{8}')]],
          city:[null , [Validators.required]]

        })
      }

      getCartId():void{
        this.activatedRoute.paramMap.subscribe({
          next:(param)=>{
            this.cartId =param.get('id')!
          }
        })
      }

      submitForm():void{
        this.isLoading=true;

        console.log(this.checkOutForm.value);
        this.ordersService.checkoutpayment(this.cartId , this.checkOutForm.value).subscribe({
          next:(res)=>
            {
              console.log(res);
              if (res.status === 'success') {
                open(res.session.url , '_self' )
              }
              this.isLoading=false;
            },
          error:(err)=>{console.log(err);  this.isLoading=false}
        })
      }
  }
