import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);

  cartDetails:Icart = {} as Icart;

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData():void{
    this.cartService.getLogddedUserCart().subscribe({
      next:(res)=>{console.log(res.data); this.cartDetails=res.data },
      error:(err)=>{console.log(err)}
    })
  }

  removeItem(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // لو المستخدم وافق على الحذف
        this.cartService.removeSpecificCartItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.cartDetails = res.data;
            this.cartService.cartNumber.next(res.numOfCartItems)

            // بعد الحذف بنعرض SweetAlert2 تاني كـ feedback
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Item has been removed from your cart.',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.log(err);

            // لو حصل خطأ أثناء الحذف
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Please try again.',
            });
          }
        });
      }
    });
  }

  // removeItem(id:string):void
  // {
  //   this.cartService.removeSpecificCartItem(id).subscribe({
  //     next:(res)=>{console.log(res);  this.cartDetails = res.data;},
  //     error:(err)=>{console.log(err)}
  //   })
  // }

  updateCount(id: string, count: number): void {
    if (count < 1) {
      this.toastrService.warning('You reached the minimum quantity!', 'Minimum Limit');
      return;
    }

    const currentProduct = this.cartDetails.products.find(p => p.product.id === id);
    const currentCount = currentProduct ? currentProduct.count : 0;

    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;

        if (count > currentCount) {
          this.toastrService.success('Item quantity increased!', 'Cart Updated');
        } else if (count < currentCount) {
          this.toastrService.info('Item quantity decreased!', 'Cart Updated');
        } else {
          this.toastrService.info('Quantity unchanged.', 'No Change');
        }
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error('Failed to update the item quantity.', 'Error');
      },
    });
  }

  // updateCount(id:string , count:number):void
  // {
  //   this.cartService.updateProductQuantity(id,count).subscribe({
  //     next:(res)=>{console.log(res); this.cartDetails = res.data},
  //     error:(err)=>{console.log(err)}
  //   })
  // }

  clearItems(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to clear the entire cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (res) => {
            console.log(res);
  
            if (res.message === 'success') {
              this.cartDetails = {} as Icart;
              this.cartService.cartNumber.next(0)
  
              // بعد المسح، نعرض SweetAlert للتأكيد
              Swal.fire({
                icon: 'success',
                title: 'Cart Cleared!',
                text: 'Your cart has been emptied.',
                timer: 1500,
                showConfirmButton: false
              });
            }
          },
          error: (err) => {
            console.log(err);
  
            // في حالة الخطأ، نعرض SweetAlert error
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong while clearing the cart!',
            });
          }
        });
      }
    });
  }


  // clearItems():void{
  //   this.cartService.clearCart().subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       if (res.message === 'success') {
  //         this.cartDetails = {} as Icart;
  //       }
  //     },
  //     error:(err)=>{console.log(err)}
  //   })
  // }


}
