import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService],
})
export class HomeComponent implements OnInit {

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  async onGoogleLogin(){
    try{
      await this.authSvc.loginGoogle();
      this.router.navigate(['/register']);
    }
    catch(error){
      console.log(error);
    }
  }
}
