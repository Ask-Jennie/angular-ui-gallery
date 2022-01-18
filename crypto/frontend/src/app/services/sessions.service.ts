import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  token_key = "token";
  user_key = "info";
  
  constructor() { }

  is_logged_in() {
    return this.get_key_from_local_storage(this.token_key, false);
  }

  logout() {
    localStorage.removeItem(this.token_key);
    localStorage.removeItem(this.user_key)
    return true;
  }

  add_user_session(token) {
    localStorage.setItem(this.token_key, token);    
  }

  add_user_info(compelete_info) {
    localStorage.setItem(this.user_key, JSON.stringify(compelete_info));
  }

  get_user_info() {
    return this.get_key_from_local_storage(this.user_key, true);
  }

  get_token() {
    return this.get_key_from_local_storage(this.token_key, false);
  }

  private get_key_from_local_storage(key, is_json) {
    let cache_info = localStorage.getItem(key);

    if (!cache_info) {
      false;
    }

    if (is_json) {
      try {
        return JSON.parse(cache_info)
      } catch(e) {
        return false;
      }
    }

    return cache_info;
  }
}
