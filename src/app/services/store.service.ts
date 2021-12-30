import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { TextPostData } from '../types/text.types';

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

  getDocRef(path, docId): DocumentReference {
    const docRef = doc(this.firestore, path, docId);
    return docRef;
  }

  getDoc(path, docId) {
    return getDoc(doc(this.firestore, path, docId));
  }

  post(path: string, postData: any): Promise<DocumentReference<any>> {
    const postDataWithTime = {
      ...postData,
      createdAt: Timestamp.now(),
    };
    return addDoc(collection(this.firestore, path), postDataWithTime);
  }

  update(path: string, updateData: any, docId: string): Promise<void> {
    const docRef = doc(this.firestore, path, docId);
    return updateDoc(docRef, updateData);
  }
}
