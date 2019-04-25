import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs/Subject';
import {TokenService} from './token.service';

@Injectable()
export class UserService {
    avatar: Subject<any> = new Subject<any>();
    private headers: any;
    private options: any;

    constructor(private http: Http,
                private tokenService: TokenService) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers : this.headers });
    }

    getUserByToken(token: string) {
      return this.http.get(environment.hostname + '/user/getUserByToken?user_token=' + token).map(res => res.json());
    }

    update(body: any) {
        let headers = new Headers({'Content-Type': 'application/json',
            'Access-Token': this.tokenService.getToken()});
        let options = new RequestOptions({ headers : headers});
        body = JSON.stringify(body);
        return this.http.put(environment.hostname + '/user/update', body, options ).map((res: Response) => res.json());
    }
}
