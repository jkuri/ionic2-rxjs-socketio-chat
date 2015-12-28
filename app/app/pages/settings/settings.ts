import { Page } from 'ionic-framework/ionic';
import { AuthService } from '../../services/auth';

@Page({
    templateUrl: 'build/pages/settings/settings.html'
})

export class Settings {

  constructor(public auth: AuthService) { }

  public logout(): void {
    this.auth.logout();
  }
}