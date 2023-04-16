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

  categoryArray !: Array<any>;

  formCategory ! : string;

  formStatus : string = 'Add';



  constructor(private categoriesService : CategoriesService) {  
  }

  onSubmit(formData : NgForm){
      let categoryData : Category = {
        category :  formData.value.category ,
      }
      this.categoriesService.saveData(categoryData)
      formData.reset()
  }
  onEdit(category : string){
    this.formCategory = category
    this.formStatus = 'Edit'
  }
  ngOnInit(): void {
    this.categoriesService.loadData().subscribe(val =>{
      console.log(val);
      this.categoryArray = val
    })
  }

}
