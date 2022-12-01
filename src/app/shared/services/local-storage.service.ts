import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setValue(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public getValue(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  public clear(): void {
    localStorage.clear();
  }
}
