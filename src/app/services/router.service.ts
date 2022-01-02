import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private _reloadSharedCollectionSubject = new Subject<boolean>();
  private _reloadMyCollectionSubject = new Subject<boolean>();

  reloadMyCollection() {
    this._reloadMyCollectionSubject.next(true);
  }

  getReloadMyCollectionSubject() {
    return this._reloadMyCollectionSubject;
  }

  reloadSharedCollection() {
    this._reloadSharedCollectionSubject.next(true);
  }

  getReloadSharedCollectionSubject() {
    return this._reloadSharedCollectionSubject;
  }
}
