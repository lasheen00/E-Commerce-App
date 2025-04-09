import { Observable } from 'rxjs';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly categoriesService = inject(CategoriesService);
  category: ICategory[] = [];


  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories()
  {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{console.log(res.data); this.category = res.data;
    }})
  }


}
