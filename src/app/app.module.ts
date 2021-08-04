import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './shared/footer/footer.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { IndexComponent } from './index/index.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { MapBoxMarkerComponent } from './map-box-marker/map-box-marker.component';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, FooterComponent, SendEmailComponent, IndexComponent, MapBoxComponent, MapBoxMarkerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
