import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { TokenService } from '../../../service/token.service';
import { environment } from '../../../../environments/environment';
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

  avatar: string;
  @Output()
  add: EventEmitter<string> = new EventEmitter<string>();
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService) {
    this.genderArr = ['female', 'male'];
  }

  ngOnInit() {
    this.sub = this.tokenService.getDataWithToken(environment.hostname + '/user/getDetail').subscribe(result => {
      this.user = result.data;
      console.log(this.user)
      this.avatar = this.user.avatar;
      this.updateForm = this.fb.group({
        fullName: [this.user.full_name],
        gender: [this.user.gender ? 'male' : 'female'],
        email: [this.user.email],
        address: [this.user.address],
        phone: [this.user.phone],
        avatar: ['']
      });
    });
  }
  cancel() {
    this.router.navigate(['profile']);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateForm.get('avatar').setValue(file);
    }
  }


  onSubmit() {

    const formData = new FormData();

    formData.append('avatar', this.updateForm.get('avatar').value);
    formData.append('fullname', this.updateForm.get('fullName').value);
    formData.append('address', this.updateForm.get('address').value);
    formData.append('phone', this.updateForm.get('phone').value);
    formData.append('gender', this.updateForm.get('gender').value);

    console.log(this.updateForm.get('address').value);
    this.load = true;


    this.userService.avatar.next(this.updateForm.get('avatar').value);
    setTimeout(() => {
      this.tokenService.postDataWithTokenFormData(environment.hostname + '/user/update', formData).subscribe(data => {
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
