import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  QuerySnapshot,
  updateDoc,
  where,
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

  async updateDisplayname(
    path: string,
    updatedDisplayName: any,
    uid: string
  ): Promise<void> {
    const snapshot = await this.getSnapshotChange(path, () =>
      where('uid', '==', uid)
    );
    const docId = snapshot.id;

    const docRef = doc(this.firestore, path, docId);
    const updateData = {
      displayName: updatedDisplayName,
    };
    return updateDoc(docRef, updateData);
  }
}
