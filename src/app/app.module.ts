import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { ProfileMenuPage } from '../pages/profilemenu/profilemenu';

//BACKAND
import {BackandService} from '../providers/backand' 
import {ProfileService} from '../providers/profile' 

//AUTH0
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from '../services/auth/auth.service';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    ProfileMenuPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    ProfileMenuPage
  ],
  providers: [
   { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] },
    BackandService,
    ProfileService
  ]
})
export class AppModule {}
