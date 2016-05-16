import {Page} from 'ionic-angular';
import {TestService} from '../../services/test.service';

@Page({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  providers: [TestService]
})
export class HelloIonicPage {

  data: any;
  error: any;
  buttonBusy: boolean = false;

  postResData: any;
  postError: any;
  postBtnBusy: boolean = false;

  coffeeShop = {
    name: '',
    city: '',
    id: 0
  }

  constructor(private _testService: TestService) {
      this._testService.getData().subscribe(
          data => this.coffeeShop.id = data.length + 1
      );
  }

  getData() {
    this.buttonBusy = true;
    this._testService.getData().subscribe(
        data => this.data = data,
        err => {this.error = err; this.buttonBusy = false},
        () => this.buttonBusy = false
    );
  }

  postData() {
    this.postBtnBusy = true;

    if (this.coffeeShop.name != '' && this.coffeeShop.city != '' && this.coffeeShop.id != 0) {
      this._testService.postData(this.coffeeShop).subscribe(
          data => {this.postResData = data; this.coffeeShop.id += 1; this.coffeeShop.name = ''; this.coffeeShop.city = ''; } ,
          error => {this.postError = error; this.postBtnBusy = false; },
          () => this.postBtnBusy = false
      );
    } else {
      this.postError = 'Please fill up the fields'
      this.postBtnBusy = false;
    }
  }
}
