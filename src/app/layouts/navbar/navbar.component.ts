import { Component, inject, input, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

   readonly authService = inject(AuthService);
   readonly myTranslateService = inject(MyTranslateService);
   readonly translateService = inject(TranslateService);
   readonly cartService = inject(CartService);

  // @Input() isLogin:boolean = true;
  isLogin = input<boolean>(true);

  countNumber:number = 0;

  ngOnInit(): void {

    this.cartService.getLogddedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.next(res.numOfCartItems)
      }
    })

    this.cartService.cartNumber.subscribe({
      next:(data)=>{
        this.countNumber=data;
      }
    })
  }

  change(lang:string):void {

    this.myTranslateService.changeLangTranslate(lang);

  }
  currentLang(lang:string):boolean {
    return this.translateService.currentLang=== lang
  }

  }
  

