import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentData,
  DocumentReference,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private ngFirestore: AngularFirestore) {}

  getSnapshotChanges(
    path: string,
    queryFn?: QueryFn<DocumentData>
  ): Observable<DocumentChangeAction<unknown>[]> {
    return this.ngFirestore.collection(path, queryFn).snapshotChanges();
  }

  getSnapshotChange(path: string, queryFn: QueryFn<DocumentData>) {
    return this.getSnapshotChanges(path, queryFn).pipe(
      map((actions) => (actions.length > 0 ? actions[0] : null))
    );
  }

  post(path: string, postData: any): Promise<DocumentReference<unknown>> {
    return this.ngFirestore.collection(path).add(postData);
  }
}
