import { User } from './user';
import { Utils } from '../utils/utils';

let utils: Utils = new Utils();

export class Message {
  id: string;
  dateSent: Date;
  isRead: boolean;
  sender: User;
  recipient: User;
  msg: string;

  constructor(obj: any) {
    this.id = obj.id || utils.randomId();
    this.dateSent = new Date();
    this.isRead = obj.isRead || false;
    this.sender = obj.sender || null;
    this.recipient = obj.recipient || null;
    this.msg = obj.msg || null;
  }

}