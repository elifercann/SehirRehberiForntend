import { AnimationPlayer } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { LoginUser } from '../models/loginUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
constructor(private httpClient:HttpClient,
  private jwtHelper:JwtHelperService,
  private route:Router,
  private alertifyService:AlertifyService,
  private http: HttpClient) { }
path="https://localhost:44305/api/auth/";
userToken:any
decodedToken:any
TOKEN_KEY="token";

login(loginUser:LoginUser){
  let headers=new HttpHeaders();
  headers=headers.append("Content-Type","application/json");

  //login urliyanlış data yine obje olarak gidiyor onu düzelt
  this.httpClient.post(this.path+"login/"+loginUser,{headers:headers}).subscribe((data:any)=>{
    this.saveToken(data['tokenString'])
    this.userToken=data['tokenString']
    this.decodedToken=this.jwtHelper.decodeToken(data['tokenString'])
    this.alertifyService.success("Sisteme giriş yapıldı")
    this.route.navigateByUrl('/city')
  })

}

register(registerUser:RegisterUser){
let headers=new HttpHeaders();
headers=headers.append("Content-Type","application/json");
this.httpClient.post(this.path+"register",registerUser,{headers:headers})
.subscribe((data:any)=>{

})
}


saveToken(token:any){
   localStorage.setItem(this.TOKEN_KEY,token)
}
//sistemden çıkış
logOut(){
  localStorage.removeItem(this.TOKEN_KEY)
  this.alertifyService.error("Sistemden çıkış yapıldı")
}
//sisteme login durumunda mı?
loggedIn(){
return this.jwtHelper.getTokenExpirationDate(this.TOKEN_KEY)
}
//hatası va 
getCurrentUserId(){
  return this.jwtHelper.decodeToken(/*this.token*/).nameid
}
get token(){
  return localStorage.getItem(this.TOKEN_KEY)
}


 /*httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
login(loginUser:LoginUser): Observable<any> {
  
  return this.http.post(
    
   this.path + 'login',
    {
      loginUser
    },
    this.httpOptions
   
  );
  this.alertifyService.success("Sisteme giriş yapıldı")
  this.route.navigateByUrl('/city')
}

register(registerUser:RegisterUser): Observable<any> {
  return this.http.post(
    this.path + 'register',
    {
      registerUser
    },
    this.httpOptions
  );
}

logOut(): Observable<any> {
  return this.http.post(this.path + 'login', { }, this.httpOptions);
}*/
}
