import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {TokenService} from '../../../service/token.service';
import {environment} from '../../../../environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit, OnDestroy {

    sub: any;
    user: any;
    load = false;
    updateForm: any;
    genderArr: Array<string> = [];
    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({cloudName: 'dobcevjy1', uploadPreset: 'tuUnsignedUpload'})
    );
    avatar: string;
    @Output()
    add: EventEmitter<string> = new EventEmitter<string>();
  constructor(private userService: UserService,
              private _fb: FormBuilder,
              private router: Router,
              private tokenService: TokenService) {
      this.genderArr = ['female', 'male'];
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
          let res: any = JSON.parse(response);
          this.avatar = res.url;
          return {item, response, status, headers};
      };
    this.updateForm = this._fb.group({
      fullName: new FormControl(''),
      gender: ['female'],
      email: new FormControl(''),
      birthday: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      avatar: new FormControl('')
    });
  }

  ngOnInit() {
      alert("Update info");
      this.sub = this.tokenService.getDataWithToken(environment.hostname + '/user/getUserDetail').subscribe(data => {
          this.user = data;
          console.log(this.user)
          this.avatar = this.user.avatar;
          let day = new Date(this.user.birthday);
          console.log(day);
          this.updateForm = this._fb.group({
              fullName: new FormControl(this.user.fullName),
              gender: [this.user.gender ? 'male' : 'female'],
              email: new FormControl(this.user.email),
              birthday: new FormControl(this.user.birthday != null ? this.user.birthday.split('T')[0] : ''),
              address: new FormControl(this.user.address),
              phone: new FormControl(this.user.phone),
              avatar: new FormControl(this.avatar)
          });
      });
  }
    cancel() {
        this.router.navigate(['profile']);
    }
    update(value: any) {
        this.load = true;
        this.uploader.uploadAll();
       setTimeout(() => {
          value.avatar = this.avatar;
          this.userService.avatar.next(value);
         let data;
         data = {
           'fullName': value.fullName,
           'gender': value.gender === 'male' ? true : false,
           'email': value.email,
           'birthday': value.birthday,
           'address': value.address,
           'phone': value.phone,
           'avatar': value.avatar
         }
         this.tokenService.putDataWithToken(environment.hostname + '/user/update', data).subscribe(data => {
           this.load = false;
           swal('Thông báo', 'Chỉnh sửa thông tin tài khoản thành công!', 'success');
           this.router.navigate(['profile']);
         }, (err: any) => {
           swal('Thông báo', 'Chỉnh sửa thất bại!', 'error');
         });
      }, 4000);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
