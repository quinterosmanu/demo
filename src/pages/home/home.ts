import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {WelcomePage} from '../welcome/welcome';

import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../providers/profile'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public auth: AuthService, public profile: ProfileService, public navCtrl: NavController) {

    this.auth.lock.on('authenticated', authResult => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.auth.storage.set('access_token', authResult.accessToken);
        this.auth.storage.set('id_token', authResult.idToken);
        this.auth.storage.set('refresh_token', authResult.refreshToken);
        this.auth.accessToken = authResult.accessToken;
        this.auth.idToken = authResult.idToken;

        // Fetch profile information
        this.auth.lock.getUserInfo(this.auth.accessToken, (error, logindata) => {
          if (error) {
            // Handle error
            alert(error);
            return;
          }
          logindata.user_metadata = logindata.user_metadata || {};
          this.auth.storage.set('profile', JSON.stringify(logindata));
          this.auth.user = logindata;
          // Send to next page
          navCtrl.setRoot(WelcomePage);
        });
        
        
        this.auth.lock.hide();

        this.auth.zoneImpl.run(() => this.auth.user = authResult.profile);
        // // Schedule a token refresh
        this.auth.scheduleRefresh();
        
        
      }

    });
    
  }

  ionViewDidLoad() {
    if (!this.auth.authenticated()) {
      this.auth.login();
    }
  }



}
