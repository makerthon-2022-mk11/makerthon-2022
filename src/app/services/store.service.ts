import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private firestore: Firestore) {}

  getSnapshotChanges(
    path: string,
    queryFn?: () => QueryConstraint
  ): Promise<QuerySnapshot<DocumentData>> {
    let q;
    if (queryFn) {
      q = query(collection(this.firestore, path), queryFn());
    } else {
      q = collection(this.firestore, path);
    }
    return getDocs(q);
  }

  getSnapshotChange(
    path: string,
    queryFn: () => QueryConstraint
  ): Promise<QueryDocumentSnapshot | null> {
    return this.getSnapshotChanges(path, queryFn).then((snapshot) => {
      return snapshot.size > 0 ? snapshot.docs[0] : null;
    });
  }

  post(path: string, postData: any): Promise<DocumentReference<any>> {
    return addDoc(collection(this.firestore, path), postData);
  }
}
