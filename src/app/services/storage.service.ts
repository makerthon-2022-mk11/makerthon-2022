import { Injectable } from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
} from '@angular/fire/storage';
import { uploadBytes } from 'firebase/storage';
import { UploadData } from '../types/storage.types';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  upload(uploadData: UploadData) {
    const storageRef = ref(this.storage, uploadData.fileName);
    return uploadBytes(storageRef, uploadData.blob);
  }

  getDownloadUrl(filename: string): Promise<string> {
    const storageRef = ref(this.storage, filename);
    return getDownloadURL(storageRef);
  }

  delete(filename: string) {
    const storageRef = ref(this.storage, filename);
    return deleteObject(storageRef);
  }
}
