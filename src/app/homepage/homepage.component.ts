import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import firebase from 'firebase/app/';
import { MapboxService, Feature } from '../services/mapbox.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[AuthService],
})
export class HomepageComponent implements OnInit {
  
  constructor(private authSvc:AuthService, private router:Router, private mapboxService: MapboxService) { }

  addresses: string[] = [];
  selectedAddress = null;

  ngOnInit(): void {
  }

  search(event: any){
    const searchTerm = event.target.value.toLowerCase();
    if(searchTerm && searchTerm.length > 0){
      this.mapboxService.searchLocation(searchTerm).subscribe((features: Feature[])=>{
        this.addresses = features.map(feat => feat.place_name)
      });
    }else{
      this.addresses = [];
    }
  }

  onSelect(address: string){
    this.selectedAddress = address;
    this.addresses = [];
  }

  async onGoogleLogin(){
    try{
      await this.authSvc.loginGoogle();
      
      firebase.auth().currentUser.getIdToken(true).then(function(uidToken){
        localStorage.setItem('uidToken', uidToken);
        });
      const uid = firebase.auth().currentUser.uid;
        localStorage.setItem('uid', uid);
      this.router.navigate(['/home']);
    }
    catch(error){
      console.log(error);
    }
  }
}
