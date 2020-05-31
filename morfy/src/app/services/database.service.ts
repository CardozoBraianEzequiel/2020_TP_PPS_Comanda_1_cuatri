import { Injectable } from '@angular/core';

import { AngularFirestore, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
    ) { }

    CreateOne(objeto: any, collection: string) {
      let id;
      if (objeto.id) {
        id = objeto.id;
      } else {
        id = this.afs.createId();
        objeto.id = id;
      }
      return this.afs.collection(collection).doc(id).set(objeto);
  }


  GetOne(collection, id) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`${collection}`).doc(id).valueChanges().subscribe(snapshots => {
        resolve(snapshots);
      });
    });
  }

  GetAll(collection): Observable<any[]> {
    return this.afs.collection<any>(collection).valueChanges()
    .pipe (res => res );
  }

  
  UpdateOne(objeto: any, collection: string) {
    const id = objeto.id;
    const objetoDoc = this.afs.doc<any>(`${collection}/${id}`);
    return objetoDoc.update(objeto);
  }


  DeleteOne(id: any, collection: string) {
    const objetoDoc = this.afs.collection(`${collection}`).doc(id);
    return objetoDoc.delete();
  }


  uploadImage(image: File) {
    // The storage ref
    const storageRef = this.storage.ref('morfy-images/' + image.name);
    // Upload the file
    const uploadTask = storageRef.put(image);

    return uploadTask;
  }

}