import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient,private router:Router) {}
  
  user:any;

  public createNewUser(dataObj: any) {
    this.http.post<any>('http://localhost:3000/users/', dataObj)
      .subscribe((res) => {
        alert('Account created successfully');
        this.router.navigate(['login']);
      }
      
      );
  }

  public getUser(email:string){
    return new Promise((resolve, reject)=>{
      this.http.get('http://localhost:3000/users?email=' + email).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    })
  }
  
}
