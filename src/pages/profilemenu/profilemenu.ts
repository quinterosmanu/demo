import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../providers/profile';
/*
  Generated class for the Profilemenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profilemenu',
  templateUrl: 'profilemenu.html'
})
export class ProfileMenuPage {

  users: any;
  constructor(public viewCtrl: ViewController, public profile: ProfileService, public auth: AuthService) { }

  ionViewDidEnter() {
    if (this.auth.authenticated()) {
      this.users = this.profile.getProfile();
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
