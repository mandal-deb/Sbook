import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,public userService:UserService, private router:Router,public http:HttpClient,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  loginForm=this.fb.group(
    {
      email: new FormControl ('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    }
  )
 
  login(){
    this.userService.getUser(this.loginForm.value.email).then((res:any)=>{
      console.log(res);
      if(res.length == 0){
        console.log("account does not exist");
        this.snackbar.open('Account does not exist','ok');
      }else{
        if(res[0].password === this.loginForm.value.password){
          console.log("matched");
          this.snackbar.open('Login successful', 'ok');
          this.userService.user = res[0];
          localStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['/post']);
        }else{
          console.log("incorrect password");
          this.snackbar.open('Incorrect password', 'ok');
        }
      }
    }).catch((err)=>{
      console.log(err);
    });
  }
  }
