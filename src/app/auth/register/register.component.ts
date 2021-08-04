import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(private authSvc:AuthService, private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
      }
    )
  }
  async onRegister(){
    const {email, password} = this.registerForm.value;
    try{
      const user = await this.authSvc.register(email, password);
      if(user){
        this.router.navigate(['/verification-email']);
      }
    }
    catch(error){console.log(error)}
  }
}
