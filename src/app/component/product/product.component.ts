import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../../service/share.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  constructor(private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
      if (!this.id) {
        this.router.navigate(['/home']);
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
