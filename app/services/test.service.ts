import { Injectable } from "angular2/core";
import { Http, Headers, Response, RequestOptions } from "angular2/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TestService {

  private url = 'http://temp.acomsys.net/api/CoffeeShops';
  
  constructor(private http: Http) {}

  getData () {
    return this.http.get(this.url)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  postData (coffeeShop: any) {
    let body = JSON.stringify(coffeeShop);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
                    .map(res => res.json())
                    .catch(this.handleError);
  }


  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
