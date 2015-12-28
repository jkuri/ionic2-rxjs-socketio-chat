import { Page, Modal } from 'ionic-framework/ionic';
import * as Rx from 'rxjs/Rx';
import { ChatService } from '../../services/chat';
import { User } from '../../models/user';
import { Chat } from '../chat/chat';

@Page({
  templateUrl: 'build/pages/friends/friends.html'
})

export class Friends {
  public searchQuery: string = '';
  friends: Rx.Subject<User[]> = new Rx.Subject<User[]>(null);
  chatPage: any;

  constructor(public chat: ChatService, public modal: Modal) {
    this.friends = chat.friends;
    this.chatPage = Chat;
  }
  
  public openChat(user: User): void {
    this.chat.setCurrentFriend(user);
    this.modal.open(this.chatPage);
  }

}