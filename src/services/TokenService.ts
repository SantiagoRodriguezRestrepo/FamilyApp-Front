import { BehaviorSubject } from 'rxjs';
import { ITokenService } from '../utils/interfaces';

class TokenService implements ITokenService {
  private data: BehaviorSubject<any>;

  constructor() {
    this.data = new BehaviorSubject<any>(null);
  }

  sendData(data: any): void {
    this.data.next(data);
  }

  getData(): BehaviorSubject<any> {
    return this.data;
  }
}

const myServiceInstance = new TokenService();

export default myServiceInstance;
