import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc} from '@angular/fire/firestore';
import { deleteDoc, doc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private fireStore : Firestore, private toastr : ToastrService) { 
    
  }

  saveData(data : any){
          // let subCategoryData = {
      //   subCategory :  'subCategory2' ,
      // }
      const collectionInstance = collection(this.fireStore, 'categories')
      addDoc(collectionInstance, data).then(docRef =>{
        console.log(docRef);
        this.toastr.success('Data Insert Successfully')
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

  // userData !: Observable<any>

  loadData(){
    // return this.afs.collection('categories').snapshotChanges().pipe(
    //   map(actions => {
    //     actions.map(a =>{
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, data}
    //     })
    //   })
    // )
    const collectionInstance = collection(this.fireStore, 'categories')
    
    // this.userData =  collectionData(collectionInstance)

    //this is an observable
    // return collectionData(collectionInstance) // firstore id is not needed
    return collectionData(collectionInstance, { idField: 'id' })
  }

  updateData(id : string, EditData : any){
    const docInstance = doc(this.fireStore, 'categories', id);
    
    updateDoc(docInstance, EditData)
    .then(()=>{
      this.toastr.success('Edited Succesfully..!');
      console.log("Data updated");
    })
    .catch(err =>{
      console.log(err);
      
    })

    // this.afs.collection('categories').doc(id).update(EditData).then(docRef =>{
    //   this.toastr.success('Edited Succesfully..!');
    // })
    
  }

  deleteData(id : string){
    const docInstance = doc(this.fireStore, 'categories', id);
    deleteDoc(docInstance)
    .then(()=>{
      this.toastr.success('Deleted Succesfully..!');
    })
    .catch((err)=>{
      console.log(err);
    })

  }
}
