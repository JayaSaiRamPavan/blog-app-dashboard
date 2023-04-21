import { Router } from '@angular/router';
import { Post } from './../models/post';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { getDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private fireStore : Firestore,
    private storage : AngularFireStorage,
    private toastr : ToastrService,
    private router : Router
    ) { }

  uploadImage(selectedImage : any, postData : Post, formStatus : string, id : any){
    const filePath = `postIMG/${Date.now()}`;
    this.storage.upload(filePath, selectedImage)
    .then(()=>{
      this.storage.ref(filePath).getDownloadURL().subscribe(URL =>{
        postData.postImgPath = URL;
        if(formStatus === 'Edit'){
          this.updateData(id, postData)
        }
        else{
          this.saveData(postData)
        }
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  private saveData(postData : Post){
    const collectionInstance = collection(this.fireStore, 'posts')
    addDoc(collectionInstance, postData)
    .then(docRef =>{
      this.toastr.success('Post Insert Successfully')
      this.router.navigate(['/posts'])
    })
    .catch(err =>{
      console.log(err);
    })
  }

  loadData(){
    const collectionInstance = collection(this.fireStore, 'posts')
    
    return collectionData(collectionInstance, { idField: 'id' })
  }

  loadOneData(id : any){
    const collectionInstance = collection(this.fireStore, 'posts')
    //this.afs.doc(`posts/${id}`).valueChanges();
    return getDoc(doc(collectionInstance, id));
  }

  updateData(id : any, postData : any){
    const docInstance = doc(this.fireStore, 'posts', id);
    
    updateDoc(docInstance, postData)
    .then(()=>{
      this.toastr.success('Edited Succesfully..!');
      this.router.navigate(['/posts']);
    })
    .catch(err =>{
      console.log(err);
      
    })
    
  }

  deleteImage(postImgPath : any, id : string){
    this.storage.storage.refFromURL(postImgPath).delete()
    .then(()=>{
      this.deleteData(id);
    })
    .catch(err =>{
      console.log(err);
      
    })
  }

  private deleteData(id : string){
    const docInstance = doc(this.fireStore, 'posts', id);
    deleteDoc(docInstance)
    .then(()=>{
      this.toastr.warning('Deleted Succesfully..!');
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  markFeatured(id :string, featuredData : any){
    const docInstance = doc(this.fireStore, 'posts', id);
    updateDoc(docInstance, featuredData)
    .then(()=>{
      this.toastr.info('Featued Status Updated');
    })
    .catch(err =>{
      console.log(err);
      
    })

  }



}
