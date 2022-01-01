import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private reloadSubject = new Subject<boolean>();

  reload() {
    this.reloadSubject.next(true);
  }

  getReloadSubject() {
    return this.reloadSubject;
  }
}
