export class Utils {
  public randomId(): number {
    return Math.random().toString(36).substring(7);
  }
}