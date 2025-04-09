import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../core/pipes/term.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [TranslatePipe,SearchPipe,RouterLink,TermPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  products: IProduct[] = [];
  text : string = "";

  ngOnInit(): void {
    this.getProductsData();
  }




  getProductsData():void
  {
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{console.log(res.data); this.products = res.data;}
    })
  }

  
  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      if (res.status === 'success') {
        this.toastrService.success(res.message , 'Fresh Cart');
        this.cartService.cartNumber.next( res.numOfCartItems );
      }
    }
    })
    }

}
