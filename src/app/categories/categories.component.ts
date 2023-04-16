import { CategoriesService } from './../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService : CategoriesService) {  
  }

  onSubmit(formData : NgForm){
      let categoryData : Category = {
        category :  formData.value.category ,
      }
      this.categoriesService.saveData(categoryData)
  }
  ngOnInit(): void {
    this.categoriesService.loadData().subscribe(val =>{
      console.log(val);
    })
  }

}
