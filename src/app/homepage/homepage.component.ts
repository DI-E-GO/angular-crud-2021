import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[AuthService],
})
export class HomepageComponent implements OnInit {

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  async onGoogleLogin(){
    try{
      await this.authSvc.loginGoogle();
      this.router.navigate(['/home']);
    }
    catch(error){
      console.log(error);
    }
  }
}
