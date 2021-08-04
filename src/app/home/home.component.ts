import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../models/user.model';
import { Feature, MapboxService } from '../services/mapbox.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService],
})
export class HomeComponent implements OnInit {
  select: boolean=false;
  profilesRef: Array<User>;
  user: User = new User();
  userAdd: User = new User();
  constructor(private profileSvc: ProfileService, private authSvc:AuthService, private router:Router, private mapboxService: MapboxService) {
    this.profilesRef = new Array<User>();
   }
  addresses: string[] = [];
  selectedAddress = null;
  searchTerm: string= null;
  ngOnInit(): void {
    this.profileSvc.getListUser().subscribe(res =>{
      for(var i in res){
        this.userAdd = new User;
        Object.assign(this.userAdd, res[i])
        this.userAdd.key=i;
        this.profilesRef.push(this.userAdd);
      }
      console.log(this.profilesRef);
    });
  }
  selectUser(user: User){
    this.user=user;
    this.select = true;
  }
  updateUser(user: User, key: string){
    this.profileSvc.updateUser(user,key).subscribe(res =>{
      console.log('Se actualizo');
      this.user = new User();
      this.select = false;
    })
  }
  search(event: any){
    //this.searchTerm = event.target.value.toLowerCase();
    if(this.searchTerm){
      this.mapboxService.searchLocation(this.searchTerm).subscribe((features: Feature[])=>{
        this.addresses = features.map(feat => feat.place_name);
      });
    }
  }

  onSelect(address: string){
    this.selectedAddress = address;
    this.addresses = [];
  }

  saveUser(): void{
    this.profileSvc.createUser(this.user).subscribe(json => console.log('Se agrego un usuario', json));
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
