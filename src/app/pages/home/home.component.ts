import { SearchPipe } from './../../core/pipes/search.pipe';
import { TermPipe } from './../../core/pipes/term.pipe';
import { Category } from './../../shared/interfaces/iproduct';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  imports: [CarouselModule ,FormsModule , RouterLink , TermPipe , SearchPipe , TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  products: IProduct[] = [];
  Categories: ICategory[] = [];
  text : string = "";

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  ngOnInit():void
  {
    this.getProductsData();
    this.getCategoryData();
  }
  

  getProductsData():void
  {
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{console.log(res.data); this.products = res.data;}
    })
  }


  getCategoryData():void
  {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{console.log(res.data); this.Categories=res.data}
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
