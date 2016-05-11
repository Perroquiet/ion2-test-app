import {Page, Toast, NavController} from 'ionic-angular';
import { Http, Headers, Response, RequestOptions, HTTP_PROVIDERS } from "angular2/http";

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [HTTP_PROVIDERS]
})
export class Page1 {
  jsonData : Object;
  buttonBusy: boolean = false;
  nav: NavController;
  errMessage: string;
  url: string = 'http://jsonplaceholder.typicode.com/';

  constructor(public http: Http, nav: NavController) { this.nav = nav; }

  getData() {
    this.buttonBusy = true;

    this.http.get(this.url + 'posts?userId=1')
			.subscribe(
				data => this.jsonData = data,
				err => this.logError(err),
				() => this.buttonBusy = false
			);
    }

  postData() {
    let data = {
      title: 'John',
      body: 'Appleseed',
      userId: 1
    };

    let uri = 'posts/';

    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.url + uri, body, options);
  }

  logError(err) {
    console.error('There was an error: ' + err);
    this.errMessage = err;
    let toast = Toast.create({
        message: 'There was an error',
        duration: 5000
    });
    this.buttonBusy = false;
    this.nav.present(toast);
  }
}
