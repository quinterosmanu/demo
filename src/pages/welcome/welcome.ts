import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../providers/profile';
import { ProfileMenuPage} from '../profilemenu/profilemenu';

/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  users: Observable<any>;
  constructor(public popoverCtrl: PopoverController, public profile: ProfileService, public auth: AuthService) { }


  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    if (this.auth.authenticated()) {
      this.users = this.profile.getProfileForId(this.auth.user.user_id);

    }
  }

  showProfileMenu(event) {
    console.log(event);
    let popover = this.popoverCtrl.create(ProfileMenuPage);
    popover.present({
      ev: event
    });
  }
}
