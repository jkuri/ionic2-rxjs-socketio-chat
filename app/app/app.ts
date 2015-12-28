import { App, IonicApp, Platform } from 'ionic-framework/ionic';
import { NgIf } from 'angular2/core';
import * as Rx from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from './models/user';
import { Message } from './models/message';
import { AuthService } from './services/auth';
import { ChatService } from './services/chat';
import { Friends } from './pages/friends/friends';
import { Settings } from './pages/settings/settings';

@App({
  templateUrl: 'build/app.html',
  providers: [AuthService, ChatService]
})

class ChatApp {
  name: string;

  friendsPage: any;
  settingsPage: any;
  chatPage: any;

  constructor(public app: IonicApp, 
              public platform: Platform, 
              public auth: AuthService,
              public chat: ChatService) {
    this.initializeApp();

    this.friendsPage = Friends;
    this.settingsPage = Settings;

    if (tokenNotExpired()) {
      this.chat.socketAuth();
    }
  }

  login(): void {
    this.auth.getToken(this.name).then((status) => {
      if (status) {
        this.chat.socketAuth();
      }
    });
  }

  loggedIn(): boolean {
    return tokenNotExpired();
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      
    });
  }
}
