export class User {
  id: string;
  name: string;
  avatar: string;

  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.avatar = obj.avatar;
  }
}