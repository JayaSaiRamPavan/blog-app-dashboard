import { Post } from './../../models/post';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  constructor( private postsService : PostsService) { }

  postArray !: Array<any>;
  ngOnInit(): void {
    this.postsService.loadData()
    .subscribe(val =>{
      this.postArray = val;
      console.log(this.postArray);
      
    })
  }
  onDelete(postImgPath : any, id : string){
    this.postsService.deleteImage(postImgPath,id)
  }
  
  onFeatured(id : string, value: boolean){
    const featuredData = {
      isFeatured : value
    }
    this.postsService.markFeatured(id, featuredData)

  }

}
