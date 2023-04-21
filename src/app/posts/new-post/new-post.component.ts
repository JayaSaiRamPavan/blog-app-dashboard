import { PostsService } from './../../services/posts.service';
import { Post } from './../../models/post';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  post !: any ;
  formStatus : string = 'Add New'
  docId ! : any;
  postForm !: any; 
  categories !: Array<any>
  permaLink : string ='';
  imgSrc : any = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='; 
  selectedImg : any ;

  constructor(
    private postsService : PostsService, 
    private categoriesService:CategoriesService, 
    private formBuilder : FormBuilder,
    private route : ActivatedRoute
    ) { 
      this.route.queryParams.subscribe(val =>{
        this.docId = val['id']
        if(this.docId){
          this.postsService.loadOneData(val['id'])
          .then((docSnap) => {
          // if (docSnap.exists()) {
            this.post = docSnap.data();
            console.log(this.post);
            this.postForm =  formBuilder.group({
              title : [this.post.title , [Validators.required, Validators.minLength(10)]],
              excerpt : [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
              permalink : [this.post.permalink, Validators.required],
              category : [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
              postImg : ['', Validators.required],
              content : [this.post.content, Validators.required]
           }
           )
           this.imgSrc = this.post.postImgPath
           this.formStatus = 'Edit'
           this.permaLink = this.post.permalink.replace(/\s/g, '-');
          
          })
        .catch((error) => {
            console.error("Error getting document:", error);
          });
        }

      else{
          this.postForm =  formBuilder.group({
              title : ['' , [Validators.required, Validators.minLength(10)]],
              excerpt : ['', [Validators.required, Validators.minLength(50)]],
              permalink : ['', Validators.required],
              category : ['', Validators.required],
              postImg : ['', Validators.required],
              content : ['', Validators.required]
           }
          )
    }     
      })
  }

  

  get fc(){
    return this.postForm.controls
  }

  onSubmit(){

    let splitted = this.postForm.value.category.split('-')
    const postData : Post = {
      title : this.postForm.value.title,
      permalink : this.postForm.value.permalink,
      category : {
        categoryId : splitted[0],
        category : splitted[1]
      },
      postImgPath :'',
      excerpt : this.postForm.value.excerpt,
      content : this.postForm.value.content,
      isFeatured : false,
      views : 0,
      status : 'new',
      createdAt : new Date()
    }
    this.postsService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset()
    this.imgSrc = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
  }

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe(
      val =>{
        this.categories = val 
      }
    )
  }

  onTitleChange($event : any){
    const title = $event.target.value;
    this.permaLink = title.replace(/\s/g, '-');
  }
  showPreview($event : any){
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        this.imgSrc = e.target.result;
      }
      //or / this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

 
}
