import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: '',
    emailOffers: true,
    interfaceStyle: '',
    subscriptionType: 'Annual',
    notes: 'Here are some notes...'
  };


  postError = false;
  postErrorMessage = '';
  subscriptionTypes!: Observable<string[]>;

  max = 10;
  rate = 7;
  isReadonly = true;

  userSettings: UserSettings = { ...this.originalUserSettings }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscriptionTypes = this.dataService.getSubscriptionType();
  }

  onHttpError(errorResponse: any) {
    console.log(errorResponse)
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    if (form.valid)
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log(result),
        error => this.onHttpError(error)
      )

    else {
      this.postError = true;
      this.postErrorMessage = "please fix the above errors"
    }
  }

  onBlur(field: NgModel) {
    console.log(field)
  }
}
