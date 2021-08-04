import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase} from '@angular/fire/database';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProfileService{
  private dbPath='/prolines';
  private urlAPI = 'https://petnatics-b9719-default-rtdb.firebaseio.com/prolines/'+localStorage.getItem('uid');
  profilesRef: AngularFireList<User>=null;
  userId: string;
  tokenId: string;
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth, private http: HttpClient) {
    this.auth.authState.subscribe(user =>{
      if(user){
        this.userId = user.uid;
      }
    });
    this.profilesRef = db.list(this.dbPath);
   }

   getUserList(): AngularFireList<User>{
     if(!this.userId){return;}
     this.profilesRef = this.db.list(`profiles/${this.userId}`)
     return this.profilesRef;
   }

   getAll(): AngularFireList<User>{
     return this.profilesRef;
   }

   getListUser(): Observable<User>{
    const httpOptions = {
      params: new HttpParams().set('auth', localStorage.getItem('uidToken')),
    }
    return this.http.get(this.urlAPI+'.json', httpOptions);
   }

   createUser(user: User): Observable<User>{
    const httpOptions = {
/*       headers: new HttpHeaders({
        'uid': localStorage.getItem('uid'),
      }), */
      params: new HttpParams().set('auth', localStorage.getItem('uidToken')),
    }
    return this.http.post<User>(this.urlAPI+'.json', user, httpOptions);
   }

   updateUser(user: User, key: string): Observable<User>{
    const httpOptions = {
/*       headers: new HttpHeaders({
        'uid': localStorage.getItem('uid'),
      }), */
      params: new HttpParams().set('auth', localStorage.getItem('uidToken')),
    }
    return this.http.patch<User>(this.urlAPI+'/'+key+'.json', user, httpOptions);
   }

   create(user: User): any{
     return this.profilesRef.push(user);
   }

   update(key: string, value: any): Promise<void>{
     return this.profilesRef.update(key, value);
   }

   delete(key: string): Promise<void>{
     return this.profilesRef.remove(key);
   }

   deleteAll():Promise<void>{
     return this.profilesRef.remove();
   }
}
