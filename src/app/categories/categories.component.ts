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

  categoryId !: string;

  constructor(private categoriesService : CategoriesService) {  
  }

  onSubmit(formData : NgForm){
      let categoryData : Category = {
        category :  formData.value.category ,
      }

      if(this.formStatus === 'Add'){
        this.categoriesService.saveData(categoryData)
        formData.reset()
      }
      else if(this.formStatus === 'Edit'){
        this.categoriesService.updateData(this.categoryId, categoryData)
        formData.reset()
        this.formStatus = 'Add'
      }
      
  }
  onEdit(category : string, id : string){
    this.formCategory = category
    this.formStatus = 'Edit'
    this.categoryId = id
  }

  onDelete(id: string){
    this.categoriesService.deleteData(id)
  }

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe(val =>{
      console.log(val);
      this.categoryArray = val
    })
  }

}
