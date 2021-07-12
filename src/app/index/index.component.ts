import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers:[AuthService]
})
export class IndexComponent implements OnInit {

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
