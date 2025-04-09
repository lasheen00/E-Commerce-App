import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  imports: [TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);


  detailsProduct:IProduct |null = null;


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next:(p)=>
        {
          let idProduct = p.get('id');


          //Logic Api  Call Api Specific

          this.productsService.getSpecificProduct(idProduct).subscribe({
            next:(res)=>{console.log(res.data); this.detailsProduct = res.data;},
            error:(err)=>{console.log(err)}
          })


        }
    })

  }
}
