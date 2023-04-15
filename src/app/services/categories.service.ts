import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private fireStore : Firestore) { }

  saveData(data : any){
          // let subCategoryData = {
      //   subCategory :  'subCategory2' ,
      // }
      const collectionInstance = collection(this.fireStore, 'categories')
      addDoc(collectionInstance, data).then(docRef =>{
        console.log(docRef);
        // const collectionInstance2 = collection(docRef, 'subcategories')
        // addDoc(collectionInstance2, subCategoryData)
        // .then((docRef2)=>{
        //   console.log(docRef2);
        // })
        // .catch((err2)=>{
        //   console.log(err2); 
        // })
      })
      .catch((err) =>{
        console.log(err);
      })
      
      // this.fireStore.collection('categories').add(categoryData).then(docRef =>{
      //   console.log(docRef);
      // alternative
      //   this.afs.doc(`categories/${docRef.id}`).collection('subcategories').add(subCategoryData)
        
      // })
      // .catch(err =>{
      //   console.log(err);
      // })
      
  }
}
