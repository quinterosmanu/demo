import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs';

import { BackandService } from './backand';


/*
  Generated class for the Profile provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileService {

  profile: {};
  constructor(public backand: BackandService) {
    backand.setAppName('manuel');
    backand.setAnonymousToken('514247de-6e9c-4cfa-84cd-ec02b7faa247');
    backand.useAnonymousAuth();
  }

  public getProfileForId(auth0id: string) {
    var response = this.backand.getList("users", 5, 1, { "fieldName": "auth0id", "operator": "equals", "value": auth0id });
    response.subscribe(
      x => { this.profile = x; },
      err => { console.log('Error: ' + err); },
      () => { console.log("Completed"); }
    )
    return response;
  }

  public getProfile() {
    return this.profile;
  }
}
