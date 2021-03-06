import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  documentId,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  QuerySnapshot,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { getRandomInt } from '../utils/random.util';

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

  getDocById(path: string, docId: string) {
    const docRef = doc(this.firestore, path, docId);
    return getDoc(docRef);
  }

  getDocsByIds(path: string, docIds: string[]) {
    const promises = docIds.map((docId) => this.getDocById(path, docId));
    return Promise.all(promises);
  }

  getRandomDoc(path: string, queryFn: () => QueryConstraint) {
    return this.getSnapshotChanges(path, queryFn).then((snapshot) => {
      const randomIndex = getRandomInt(snapshot.size);
      return snapshot.size > 0 ? snapshot.docs[randomIndex] : null;
    });
  }

  getDocRef(path, docId): DocumentReference {
    const docRef = doc(this.firestore, path, docId);
    return docRef;
  }

  post(path: string, postData: any): Promise<DocumentReference<any>> {
    return addDoc(collection(this.firestore, path), postData);
  }

  update(path: string, updateData: any, docId: string): Promise<void> {
    const docRef = doc(this.firestore, path, docId);
    return updateDoc(docRef, updateData);
  }

  delete(path: string, docId: string): Promise<void> {
    const docRef = doc(this.firestore, path, docId);
    return deleteDoc(docRef);
  }
}
