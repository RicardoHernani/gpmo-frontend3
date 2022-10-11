import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { Collector } from '../models/collector';
import { LocalUser } from '../models/local_user';

@Injectable()
export class StorageService {

  getLocalUser(): LocalUser {
      const usr = localStorage.getItem(STORAGE_KEYS.localUser);
      if (usr == null) {
          return null;
      }
      else {
          return JSON.parse(usr);
      }
  }

  setLocalUser(obj: LocalUser) {
      if (obj == null) {
          localStorage.removeItem(STORAGE_KEYS.localUser);
      }
      else {
          localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
      }
  }

  getCollector(): Collector {
    const str = localStorage.getItem(STORAGE_KEYS.collector);
    if (str == null) {
        return null;
    }
    else {
        return JSON.parse(str);
    }
  }

  setCollector(obj: Collector) {
      if (obj == null) {
          localStorage.removeItem(STORAGE_KEYS.collector);
      }
      else {
          localStorage.setItem(STORAGE_KEYS.collector, JSON.stringify(obj));
      }
  }

}
