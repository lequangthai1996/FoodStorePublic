import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Http, RequestOptions} from '@angular/http';
import {ShareService} from '../../service/share.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: Http,
              private service: ShareService,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      full_name: new FormControl('', [Validators.required]),
      card: new FormControl('', []),
      gender: new FormControl('true', [Validators.required]),
      birthday: new FormControl('', []),
      email: ['', [Validators.required, Validators.email],
        this.isEmailUnique.bind(this)
      ],
      phone_number: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [])
    }, {
      validator: this.MatchPassword
    });
  }

  isEmailUnique(control: AbstractControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.get(environment.hostname + '/user/check-mail?email=' + control.value).map(res => res.json()).subscribe(data => {
          if (data) {
            resolve({'isEmailUnique': true});
          } else {
            resolve(null);
          }
        }, () => {
          resolve({'isEmailUnique': true});
        });
      }, 100);
    });
    return q;
  }

  MatchPassword(AC: AbstractControl) {
    let password, confirmPassword;
    password = AC.get('password').value; // to get value in input tag
    confirmPassword = AC.get('password_confirmation').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('password_confirmation').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }

  save(model) {
    console.log(model);
    let url, data;
    url = environment.hostname + '/user/register';
    data = {
      'username': model.email,
      'email': model.email,
      'password': model.password,
      'fullName': model.full_name,
      'address': model.address,
      'phone': model.phone_number,
      'gender': model.gender,
      'birthday': model.birthday,
      'avatar': 'no-image.jpg',
      'creditCard': model.card,
    };
    let headers;
    headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options;
    options = new RequestOptions({headers: headers});
    this.http.post(url, data, options).map(res => res.json()).subscribe(d => {
      swal('Thông báo', 'Đăng kí thành công!', 'success');
      this.router.navigate(['/login']);
    }, err => {
      swal('Thông báo', 'Đăng kí thành bại!', 'error');
    });
  }
      ngOnInit() {
      }
}
