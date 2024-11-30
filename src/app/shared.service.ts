import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public static connected: boolean = false;
  public static users: any[] = [];
  public static nb_users = 0;
  public static current_user_id: number;
  constructor() {}
}
