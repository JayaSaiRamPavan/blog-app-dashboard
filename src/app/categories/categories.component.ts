import { CategoriesService } from './../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService : CategoriesService) { }

  onSubmit(formData : NgForm){
      let categoryData = {
        category :  formData.value.category ,
      }
      this.categoriesService.saveData(categoryData)

  }
  ngOnInit(): void {
  }

}
